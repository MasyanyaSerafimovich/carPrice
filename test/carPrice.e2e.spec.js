const playwright = require('playwright');
const chai = require('chai')
const expect = chai.expect
const selectors = require('../pageObject/mainPage').selectors
const url = require('../pageObject/mainPage').url
const config = require('../config.js').url

let page, browser, context

describe('carPrice', () => {
  beforeEach(async function() {

    browser = await playwright.chromium.launch({
      headless: false,
      slowMo: 7000
    });
      
    context = await browser.newContext()
    page = await context.newPage(url)
  })

  afterEach(async function() {
    await page.screenshot({ path: `screenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png` })
    await browser.close()
  })

  it(`переходит на второй этап с заполненным номером и email`, async() => {

    await page.goto(url);
    await page.locator(selectors.regnumber).fill(config.regnumber);
    await page.locator(selectors.email).fill(config.email);
    await page.click(selectors.priceButton);
    await page.waitForLoadState('networkidle');
    
    const text = await page.locator(selectors.confirmText).textContent();
    expect(text).to.equal('Марка авто')
  })

})
