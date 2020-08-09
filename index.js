const puppeteer = require("./puppeteer");

(async () => {
  try {
    const page = await puppeteer.initializePage();
    await page.gotoAndWait("https://github.com/");
  } catch (ex) {
    console.log(ex);
  } finally {
    process.exit();
  }
})();
