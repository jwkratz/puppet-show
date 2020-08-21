const chromium = require("chrome-aws-lambda");
const puppeteerConfig = require("./config.json");

// Customize a new Puppeteer page instance
exports.initializePage = async () => {
  const page = await newPuppeteerPage();
  await addBlockedRequests(page);
  await addGotoAndWait(page);
  return page;
};

const newPuppeteerPage = async () => {
  const launchConfig = puppeteerConfig.launch;

  // Launch a new browser instance
  const browser = await chromium.puppeteer.launch({
    args: launchConfig.args,
    headless: launchConfig.headless,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
  });

  // Create a new page in the browser context
  return await browser.newPage();
};

const addBlockedRequests = async (page) => {
  const requestConfig = puppeteerConfig.page.request;

  // Block requests for images, ads, etc
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const { blockedTypes, blockedUrls } = requestConfig;
    const requestType = request.resourceType();
    const requestUrl = request._url.split("?")[0].split("#")[0];

    if (
      blockedTypes.includes(requestType) ||
      blockedUrls.some((url) => requestUrl.includes(url))
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });
};

const addGotoAndWait = async (page) => {
  const gotoOptions = puppeteerConfig.page.goto.options;

  // Add a helper function to visit a URL and wait for page load
  page.gotoAndWait = async (url) => {
    await page.goto(url, gotoOptions);
    await page.keyboard.press("Escape");
  };
};
