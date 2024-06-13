import { test, expect, Locator, chromium, firefox } from "@playwright/test";
import { deleteExistingScreenshots, setup, page, takeScreenshot, teardown } from "../src/base/base";
import { homePageSelectors } from "../src/pages/modules/home/HomePage";
import LoginPage, { loginPageSelectors } from "../src/pages/modules/login/LoginPage";
import { ENV } from "../src/utils/ENV";
import { getTestData } from "../src/utils/GetTestData";

test.describe.configure({ mode: "serial" });

let loginPage: LoginPage;
let testData: any;
let emailErrorLocator: Locator;
let passwordErrorLocator: Locator;

test.beforeAll(async () => {
  deleteExistingScreenshots();
})

test.beforeEach(async () => {
  await setup(chromium);
  loginPage = new LoginPage(page);
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

// test("Successful Login - Valid Credentials", async () => {
//   await loginPage.loginToApplication(testData.email_address, testData.password);
//   let welcomeMessageLocator = await page.getByTestId(homePageSelectors.welcomeMessage);
//   await expect(welcomeMessageLocator).toHaveText(`Welcome ${testData.full_name}, to logout click here`);
// });

// test("Empty Email and Password Validation", async () => {
//   await loginPage.loginToApplication("", "");
//   await validateAlertErrorMessage();
//   emailErrorLocator = page.getByTestId(loginPageSelectors.errorEmail);
//   passwordErrorLocator = page.getByTestId(loginPageSelectors.errorPassword);
//   await expect(emailErrorLocator).toHaveText("This field is required");
//   await expect(passwordErrorLocator).toHaveText("This field is required");
// });

// test("Invalid Email Address Validation", async () => {
//   await loginPage.loginToApplication(testData.invalid_email, testData.password);
//   await validateAlertErrorMessage();
//   emailErrorLocator = page.getByTestId(loginPageSelectors.errorEmail);
//   await expect(emailErrorLocator).toHaveText(
//     "User not found or password doesn't not match"
//   );
// });

// test("Invalid Password Validation", async () => {
//   await loginPage.loginToApplication(testData.email_address, testData.invalid_password);
//   await validateAlertErrorMessage();
//   passwordErrorLocator = page.getByTestId(loginPageSelectors.errorPassword);
//   await expect(passwordErrorLocator).toHaveText(
//     "User not found or password doesn't not match"
//   );
// });

// test("Unregistered User Validation", async () => {
//   await loginPage.loginToApplication(testData.unregistered_email, testData.password);
//   await validateAlertErrorMessage();
//   emailErrorLocator = page.getByTestId(loginPageSelectors.errorEmail);
//   await expect(emailErrorLocator).toHaveText(
//     "User not found or password doesn't not match"
//   );
// });

// async function validateAlertErrorMessage() {
//   const parentAlertErrorElement = page.getByTestId(loginPageSelectors.alert);
//   const parentAlertErrorText = await parentAlertErrorElement.textContent();
//   // Exclude 'X' character from the parent div text content to assert the error message
//   const trimmedAlertErrorText = parentAlertErrorText?.replace("X", "").trim();
//   expect(trimmedAlertErrorText).toBe("Unable to login");
// }
