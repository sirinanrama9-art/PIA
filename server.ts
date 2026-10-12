import express from 'express';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint: Fetch and parse Google Sheet by URL
  app.get('/api/fetch-sheet', async (req, res) => {
    try {
      const sheetUrl = (req.query.url as string || '').trim();
      const sheetName = (req.query.sheet as string || '').trim();

      if (!sheetUrl) {
        return res.status(400).json({ error: 'กรุณาระบุ URL ของ Google Sheet' });
      }

      // Check if it's a valid Google Sheets URL
      const idMatch = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      const spreadsheetId = idMatch ? idMatch[1] : null;

      // Extract gid if present
      let gid = '0';
      const gidMatch = sheetUrl.match(/[#&?]gid=([0-9]+)/);
      if (gidMatch) {
        gid = gidMatch[1];
      }

      // List candidate URLs to try fetching
      const urlsToTry: string[] = [];

      if (spreadsheetId) {
        // If sheet name provided (e.g. "ภาพรวม PIA")
        if (sheetName) {
          urlsToTry.push(
            `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`,
            `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&sheet=${encodeURIComponent(sheetName)}`
          );
        }

        // Try with gid
        urlsToTry.push(
          `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${gid}`,
          `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`
        );

        // Try direct gviz without gid
        urlsToTry.push(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`);
      } else if (sheetUrl.includes('output=csv') || sheetUrl.includes('out:csv')) {
        urlsToTry.push(sheetUrl);
      } else {
        urlsToTry.push(sheetUrl);
      }

      let lastError = '';
      let successfulCsv = '';

      for (const targetUrl of urlsToTry) {
        try {
          const response = await fetch(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
              Accept: 'text/csv,text/plain,*/*',
            },
          });

          if (response.ok) {
            const text = await response.text();
            // Verify it's not an HTML login error page
            if (text && !text.includes('<!DOCTYPE html>') && text.trim().length > 0) {
              successfulCsv = text;
              break;
            } else if (text && text.includes('accounts.google.com')) {
              lastError = 'Google Sheet ไฟล์นี้ถูกตั้งเป็นส่วนตัว กรุณาตั้งค่าแชร์ไฟล์เป็น "ทุกคนที่มีลิงก์มีสิทธิ์ดู" (Anyone with the link can view)';
            }
          } else {
            lastError = `Google Sheets ตอบกลับ HTTP ${response.status}`;
          }
        } catch (e: any) {
          lastError = e.message || 'Fetch error';
        }
      }

      if (successfulCsv) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        return res.send(successfulCsv);
      }

      return res.status(400).json({
        error: lastError || 'ไม่สามารถดึงข้อมูลจาก Google Sheet ได้ กรุณาตรวจสอบว่าตั้งค่าแชร์ไฟล์เป็น "ทุกคนที่มีลิงก์มีสิทธิ์ดู" และชื่อชีตถูกต้อง',
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'ไม่สามารถดึงข้อมูลจาก Google Sheet ได้' });
    }
  });

  // Mount Vite middlewares in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
