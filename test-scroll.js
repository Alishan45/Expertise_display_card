const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('[ScrollDebugger]')) {
      console.log('BROWSER LOG:', text);
    }
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  console.log('Scrolling down continuously to trigger the bug...');
  for (let i = 0; i < 20; i++) {
    await page.evaluate(() => {
      window.scrollBy(0, 300);
    });
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('Scrolling up...');
  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => {
      window.scrollBy(0, -300);
    });
    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();
  console.log('Done.');
})();
