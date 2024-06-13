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
  await setup(chromium);
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  await page.goto(ENV.BASE_URL);
  await expect(page).toHaveURL(ENV.BASE_URL);
  testData = getTestData(ENV.ENVIRONMENT);
});

test.afterEach(async () => {
  takeScreenshot();
});

test.afterAll(async () => {
  await teardown();
});

test("TC-01 User Email Address Validation in List of Emails", async () => {
  logger.info('User email address validation in list of Emails execution is started')
  await loginPage.loginToApplication(testData.email_address, testData.password);
  const actualEmail = await homePage.verifyUserDetailInList(testData.emailaddress);
  expect(actualEmail, testData.emailaddress);
  logger.info('User email address validation in list of Emails execution is ended')
});

test("TC-02 User Full Name Validation in List of Emails", async () => {
  logger.info('User Full Name Validation in List of Emails is started')
  await loginPage.loginToApplication(testData.email_address, testData.password);
  const actualFullName = await homePage.verifyUserDetailInList(testData.full_name);
  expect(actualFullName, testData.full_name);
  logger.info('User Full Name Validation in List of Emails is started')
});

test("TC-03 In Welcome Message 'here' Should be a Link Validation", async () => {
  logger.info('In Welcome Message "here" Should be a Link Validation is started')
  await loginPage.loginToApplication(testData.email_address, testData.password);
  const hereLink = await homePage.verifyHereIsLinkInWelcomeMessage();
  expect(hereLink?.textContent(), "here");
  expect(await hereLink?.getAttribute("href")).not.toBeNull();
  const tagName = await hereLink?.evaluate((el) => el.tagName);
  expect(tagName?.toLowerCase(), "a");
  logger.info('In Welcome Message "here" Should be a Link Validation is ended')
});
