require("dotenv").config();
const winston = require("./winston");
const puppeteer = require("./puppeteer");
const notifier = require("./notifier");
const config = require("./config.json");

(async () => {
  const logger = await winston.createLogger();

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
        await notifier.send({ subject: title, message: foundMessage });
        logger.info(foundMessage);
      } else {
        logger.info(`❌ ${url}`);
      }
    }
  } catch (ex) {
    logger.error(ex);
  } finally {
    process.exit();
  }
})();
