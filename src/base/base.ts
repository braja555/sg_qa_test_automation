import { Page, Browser, BrowserType } from "@playwright/test";
import dotenv from "dotenv";
import fs from 'fs';
import logger from "../utils/LoggerUtil";

dotenv.config({ path: ".env.test" });

export let page: Page;

// Common setup function
export async function setup(browserType: BrowserType<Browser>) {
  page = await browserType
    .launch({ headless: false })
    .then((browser) => browser.newPage());
}


// Common teardown function
export async function teardown() {
  await takeScreenshot();
  await page.close();
}

export async function takeScreenshot() {
  const timestamp = new Date().toISOString().replace(/[-T:]/g, '').split('.')[0]; 
  const screenshotPath = `src/resources/screenshots/screenshot_${timestamp}.png`; 
  await page.screenshot({ path: screenshotPath });
  logger.info('Screenshot taken and saved.');
}

export async function deleteExistingScreenshots() {
  const folderPath = 'src/resources/screenshots/';
  
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
      fs.unlinkSync(`${folderPath}${file}`);
    });
    logger.info('Existing screenshots have been flushed.');
  } else {
    logger.info('Screenshots directory does not exist.');
  }
}
