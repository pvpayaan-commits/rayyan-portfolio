// Regenerate assets/og-preview.jpg (1200x630) from the live hero
const puppeteer = require('puppeteer-core');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
(async () => {
  const b = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox'] });
  const page = await b.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.goto('file:///D:/Open Ai/Portfolio/index.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'D:/Open Ai/Portfolio/assets/og-preview_raw.png', type: 'png' });
  await b.close();
  console.log('captured');
})().catch(e => { console.error(e); process.exit(1); });