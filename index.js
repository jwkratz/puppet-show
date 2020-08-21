require("dotenv").config();
const puppeteer = require("./puppeteer");
const nodemailer = require("./nodemailer");
const config = require("./config.json");

(async () => {
  try {
    const page = await puppeteer.initializePage();

    for (const scrape of config.scrapes) {
      const { url } = scrape;

      await page.gotoAndWait(url);

      const title = await page.title();
      const find = scrape.find || config.global.find;
      const findMinCount = scrape.findMinCount || 1;
      const foundElements = await page.$$(find);

      if (foundElements.length >= findMinCount) {
        const foundMessage = `✅ ${scrape.url}`;
        await nodemailer.send({ subject: title, messageText: foundMessage });
        console.log(foundMessage);
      } else {
        console.log(`❌ ${url}`);
      }
    }
  } catch (ex) {
    console.log(ex);
  } finally {
    process.exit();
  }
})();
