const dotenv = require('dotenv');
dotenv.config();

const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    //   executablePath : '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t)',
      headless:false,
      executablePath : process.env.CHROME_EXECUTABLE_PATH
    //   slowMo : 35
  })
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('https://mail.yahoo.com', {waitUntil : 'networkidle0'})
  
  await page.setViewport({ width: 1680, height: 939 })
  
  await page.waitForSelector('.login-content #login-username')
  await page.click('.login-content #login-username')
  
  await page.waitForSelector('.phone-no')
  await page.click('.phone-no')
  await page.type('.phone-no', 'abidwsi')
  
  await page.waitForSelector('#login-signin')
  await page.click('#login-signin')
  
  await navigationPromise
  
  await page.waitForSelector('[id="login-passwd"]')
  await page.click('[id="login-passwd"]')
  await page.type('[id="login-passwd"]', process.env.YAHOO_PASS)
  
  await page.waitForSelector('.challenge > #password-challenge #login-signin')
  await page.click('.challenge > #password-challenge #login-signin')
  
  await navigationPromise


  const page2 = await browser.newPage()
  await page2.goto('https://www.facebook.com/', {waitUntil: 'networkidle0'})
  
  await page2.setViewport({ width: 1680, height: 836 })
  
  await page2.waitForSelector('table #email')
  await page2.click('table #email')
  
  await page2.type('table #email', 'wisabid@gmail.com')

  await page2.waitForSelector('table input#pass')
  await page2.click('table input#pass')
  
  await page2.type('table #pass', process.env.FB_PASS)
  
  
  await page2.waitForSelector('tbody [value="Log In"]')
  await page2.click('tbody [value="Log In"]')
  
  await navigationPromise
  
//   await browser.close()
})()