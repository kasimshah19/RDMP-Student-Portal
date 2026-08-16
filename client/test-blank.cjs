const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
    const html = await page.$eval('#root', el => el.innerHTML);
    console.log('URL:', page.url());
    console.log('ROOT HTML:', html.substring(0, 500));
    await browser.close();
})();
