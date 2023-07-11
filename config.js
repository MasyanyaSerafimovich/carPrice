const { chromium } = require('playwright');

const config = {
    regnumber: 'C123TO799',
    email: 'test123@gmail.com',
}

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
const browserType = chromium;
const browserOptions = {
    headless: false,
    userAgent: userAgent,
};

module.exports = {browserType, browserOptions};
module.exports.config = config
