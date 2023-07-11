const chai = require('chai')
const expect = chai.expect
const selectors = require('../pageObject/mainPage').selectors
const url = require('../pageObject/mainPage').url
const config = require('../config.js').config
const { browserType, browserOptions } = require('../config.js');

let page, context

describe('carPrice', () => {
  beforeEach(async function() {
    const browser = await browserType.launch(browserOptions);   
    context = await browser.newContext()
    page = await context.newPage(url)
    await context.addCookies([
      {name:"current_city", value: "{%22id%22:1059%2C%22name%22:%22%D0%A1%D0%BC%D0%BE%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%22%2C%22region%22:%22%D0%A1%D0%BC%D0%BE%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%22%2C%22phone%22:%22+7%20(910)%20717-95-00%22%2C%22selected%22:true}", domain: "carprice.ru", path: "/"},
      {name:"tmr_detect", value: "0%7C1689069221079", domain: "carprice.ru", path: "/"},
      {name:"__exponea_etc__", value: "d53673d8-2e3d-49ec-9132-3c4e54ad84cc", domain: ".carprice.ru", path: "/"},
      {name:"__exponea_time2__", value: "-3.849957227706909", domain: ".carprice.ru", path: "/"},
      {name:"_ga", value: "GA1.2.106548271.1689069219", domain: ".carprice.ru", path: "/"},
      {name:"_ga_4RLHLKFH5L", value: "GS1.1.1689069218.1.0.1689069218.60.0.0", domain: ".carprice.ru", path: "/"},
      {name:"_ga_client_id", value: "1111905397.1689069097", domain: ".carprice.ru", path: "/"},
      {name:"_gcl_au", value: "1.1.2106786004.1689069218", domain: ".carprice.ru", path: "/"},
      {name:"_gid", value: "GA1.2.636699559.1689069219", domain: ".carprice.ru", path: "/"},
      {name:"_ym_d", value: "1689069218", domain: ".carprice.ru", path: "/"},
      {name:"_ym_isad", value: "2", domain: ".carprice.ru", path: "/"},
      {name:"_ym_uid", value: "1689015598233152843", domain: ".carprice.ru", path: "/"},
      {name:"qrator_jsid", value: "1689069209.117.l7eL202gsON2mBAs-ngo1jgqoa15hi46vk3vnflboj9gfqg1o", domain: ".carprice.ru", path: "/"},
      {name:"tmr_lvid", value: "1ff47c0e740099cfb7c6f004f66b8ce7", domain: ".carprice.ru", path: "/"},
      {name:"tmr_lvidTS", value: "1689015597977", domain: ".carprice.ru", path: "/"}
    ]);

  })

  afterEach(async function() {
    await page.close()
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
