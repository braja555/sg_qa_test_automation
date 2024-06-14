import { test, expect, chromium, firefox } from "@playwright/test";
import { deleteExistingScreenshots, setup, page, takeScreenshot, teardown } from "../src/base/base";
import HomePage from "../src/pages/modules/home/HomePage";
import LoginPage from "../src/pages/modules/login/LoginPage";
import { ENV } from "../src/utils/ENV";
import { getTestData } from "../src/utils/GetTestData";
import logger from "../src/utils/LoggerUtil";

test.describe.configure({ mode: "serial" });

let loginPage: LoginPage;
let testData: any;
let homePage: HomePage;

test.beforeAll(async () => {
  deleteExistingScreenshots();
})

test.beforeEach(async () => {
  test.setTimeout(60000);
  await setup(chromium);
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  await page.goto(ENV.BASE_URL);
  await expect(page).toHaveURL(ENV.BASE_URL);
  testData = getTestData(ENV.ENVIRONMENT);
  logger.info('Test setup completed for the following test case');
});

test.afterAll(async () => {
  await teardown();
  logger.info('Test teardown completed');
});

test("Verify User's Email Address in the List of Emails", async () => {
  logger.info('Execution started: Verifying user email address in the list of emails');
  await loginPage.loginToApplication(testData.email_address, testData.password);
  const actualEmail = await homePage.verifyUserDetailInList(testData.email_address);
  expect(actualEmail, testData.email_address);
  logger.info('Execution ended: Verifying user email address in the list of emails');
});

test("Verify User's Full Name in the List of Emails", async () => {
  logger.info('Execution started: Verifying user full name in the list of emails');
  await loginPage.loginToApplication(testData.email_address, testData.password);
  const actualFullName = await homePage.verifyUserDetailInList(testData.full_name);
  expect(actualFullName, testData.full_name);
  logger.info('Execution ended: Verifying user full name in the list of emails');
});

test("Validate 'Here' Link in Welcome Message", async () => {
  logger.info('Execution started: Validating the "here" link in the welcome message');
  await loginPage.loginToApplication(testData.email_address, testData.password);
  const hereLink = await homePage.verifyHereIsLinkInWelcomeMessage();
  expect(hereLink?.textContent(), "here");
  expect(await hereLink?.getAttribute("href")).not.toBeNull();
  const tagName = await hereLink?.evaluate((el) => el.tagName.toLowerCase());
  expect(tagName, "a");
  logger.info('Execution ended: Validating the "here" link in the welcome message');
});

