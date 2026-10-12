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

      // Extract spreadsheet ID accurately from various URL patterns
      // Examples:
      // https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0
      // https://docs.google.com/spreadsheets/u/0/d/1Bxi.../edit
      // https://docs.google.com/spreadsheets/d/e/2PACX-.../pubhtml
      let spreadsheetId: string | null = null;
      const isPublished = sheetUrl.includes('/spreadsheets/d/e/');
      const publishedMatch = sheetUrl.match(/\/spreadsheets\/d\/e\/([a-zA-Z0-9-_]+)/);
      const regularMatch = sheetUrl.match(/\/spreadsheets(?:\/u\/\d+)?\/d\/([a-zA-Z0-9-_]+)/);

      if (isPublished && publishedMatch) {
        spreadsheetId = publishedMatch[1];
      } else if (regularMatch) {
        spreadsheetId = regularMatch[1];
      }

      // Extract gid if present
      let gid: string | null = null;
      const gidMatch = sheetUrl.match(/[#&?]gid=([0-9]+)/);
      if (gidMatch) {
        gid = gidMatch[1];
      }

      // List candidate URLs to try fetching
      const urlsToTry: string[] = [];

      if (isPublished && spreadsheetId) {
        // Published to web URLs: https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv
        if (gid) {
          urlsToTry.push(`https://docs.google.com/spreadsheets/d/e/${spreadsheetId}/pub?output=csv&gid=${gid}`);
        }
        urlsToTry.push(`https://docs.google.com/spreadsheets/d/e/${spreadsheetId}/pub?output=csv`);
      } else if (spreadsheetId) {
        // Standard Google Sheets document
        // 1. If user provided a sheet tab name (or default "ภาพรวม PIA")
        if (sheetName) {
          urlsToTry.push(
            `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`,
            `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&sheet=${encodeURIComponent(sheetName)}`
          );
        }

        // 2. If gid was found in the URL
        if (gid) {
          urlsToTry.push(
            `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=${gid}`,
            `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`
          );
        }

        // 3. Fallback: first sheet / gid=0
        urlsToTry.push(
          `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&gid=0`,
          `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=0`,
          `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`
        );
      } else {
        urlsToTry.push(sheetUrl);
      }

      let lastError = '';
      let successfulCsv = '';
      let lastStatusCode = 200;

      for (const targetUrl of urlsToTry) {
        try {
          const response = await fetch(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              Accept: 'text/csv,text/plain,*/*',
            },
            redirect: 'follow',
          });

          if (response.ok) {
            const text = await response.text();
            // Verify it's not an HTML login error page or empty response
            const trimmed = text.trim();
            if (trimmed.length > 0 && !trimmed.startsWith('<!DOCTYPE html>') && !trimmed.includes('<html')) {
              successfulCsv = text;
              break;
            } else if (text.includes('accounts.google.com') || text.includes('ServiceLogin')) {
              lastError = 'Google Sheet ไฟล์นี้ถูกตั้งค่าเป็นส่วนตัว (Private) กรุณากดปุ่ม "แชร์ (Share)" ใน Google Sheets แล้วเปลี่ยนเป็น "ทุกคนที่มีลิงก์มีสิทธิ์ดู" (Anyone with the link can view)';
            }
          } else {
            lastStatusCode = response.status;
            if (response.status === 404) {
              lastError = `Google Sheets ตอบกลับ HTTP 404 (ไม่พบชีต): ตรวจสอบว่าลิงก์แชร์ถูกต้อง หรือชื่อแท็บ "${sheetName || 'ภาพรวม PIA'}" สะกดตรงกับชื่อแท็บใน Google Sheet`;
            } else if (response.status === 403 || response.status === 401) {
              lastError = 'ไม่ได้รับอนุญาต (HTTP 403/401): กรุณาตั้งค่าแชร์ไฟล์เป็น "ทุกคนที่มีลิงก์มีสิทธิ์ดู" (Anyone with the link can view)';
            } else {
              lastError = `Google Sheets ตอบกลับ HTTP ${response.status}`;
            }
          }
        } catch (e: any) {
          lastError = e.message || 'Fetch error';
        }
      }

      if (successfulCsv) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        return res.send(successfulCsv);
      }

      // If failed with 404 or other error, return helpful explanation
      const userMessage = lastError || (
        lastStatusCode === 404
          ? `ไม่พบข้อมูลชีต (HTTP 404): กรุณาตรวจสอบว่าชื่อแท็บ "${sheetName || 'ภาพรวม PIA'}" มีอยู่ใน Google Sheet จริง หรือลบชื่อแท็บออกเพื่อดึงแท็บแรก (gid=0)`
          : 'ไม่สามารถดึงข้อมูลจาก Google Sheet ได้ กรุณาตรวจสอบว่าตั้งค่าแชร์เป็น "ทุกคนที่มีลิงก์มีสิทธิ์ดู"'
      );

      return res.status(400).json({ error: userMessage });
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
