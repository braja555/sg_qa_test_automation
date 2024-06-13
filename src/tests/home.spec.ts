import { test, expect, chromium } from "@playwright/test";
import { deleteExistingScreenshots, setup, page, takeScreenshot, teardown } from "../base/base";
import { HomePage } from "../pages/modules/home/HomePage";
import { LoginPage } from "../pages/modules/login/LoginPage";
import { ENV } from "../utils/env";
import { getTestData } from "../utils/getTestData";


export let loginPage: LoginPage;
export let testData: any;
export let homePage: HomePage;

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

test("User Email Address Validation in List of Emails", async () => {
  await loginPage.loginToApplication(testData.email_address, testData.password);
  const actualEmail = await homePage.verifyUserDetailInList(testData.emailaddress);
  expect(actualEmail, testData.emailaddress);
});

test("User Full Name Validation in List of Emails", async () => {
  await loginPage.loginToApplication(testData.email_address, testData.password);
  const actualFullName = await homePage.verifyUserDetailInList(testData.fullname);
  expect(actualFullName, testData.fullname);
});

test("In Welcome Message 'here' Should be a Link Validation", async () => {
  await loginPage.loginToApplication(testData.email_address, testData.password);
  const hereLink = await homePage.verifyHereIsLinkInWelcomeMessage();
  expect(hereLink?.textContent(), "here");
  expect(await hereLink?.getAttribute("href")).not.toBeNull();
  const tagName = await hereLink?.evaluate((el) => el.tagName);
  expect(tagName?.toLowerCase(), "a");
});
