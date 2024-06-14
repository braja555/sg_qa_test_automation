import { test, expect, Locator, chromium } from "@playwright/test";
import {
  deleteExistingScreenshots,
  setup,
  page,
  teardown,
} from "../src/base/base";
import { homePageSelectors } from "../src/pages/modules/home/HomePage";
import LoginPage, {
  loginPageSelectors,
} from "../src/pages/modules/login/LoginPage";
import { ENV } from "../src/utils/ENV";
import { getTestData } from "../src/utils/GetTestData";
import logger from "../src/utils/LoggerUtil";
import { describe } from "node:test";

test.describe.configure({ mode: "serial" });

let loginPage: LoginPage;
let testData: any;
let emailErrorLocator: Locator;
let passwordErrorLocator: Locator;

test.beforeAll(async () => {
  deleteExistingScreenshots();
});

test.beforeEach(async () => {
  test.setTimeout(60000);
  await setup(chromium);
  loginPage = new LoginPage(page);
  await page.goto(ENV.BASE_URL);
  await expect(page).toHaveURL(ENV.BASE_URL);
  testData = getTestData(ENV.ENVIRONMENT);

  logger.info("Test setup completed for the following test case");
});

test.afterAll(async () => {
  await teardown();
  logger.info("Test teardown completed");
});
describe("Login Test", () => {
  test("Login with Valid Credentials", async () => {
    logger.info("Execution started: Login with valid credentials");
    await loginPage.loginToApplication(
      testData.email_address,
      testData.password
    );
    let welcomeMessageLocator = await page.getByTestId(
      homePageSelectors.welcomeMessage
    );
    await expect
      .soft(welcomeMessageLocator)
      .toHaveText(`Welcome ${testData.full_name}, to logout click here`, {
        timeout: 15000,
      });
    logger.info("Execution ended: Login with valid credentials");
  });

  test("Validation for Invalid Password", async () => {
    logger.info("Execution started: Validation for invalid password");
    await loginPage.loginToApplication(
      testData.email_address,
      testData.invalid_password
    );
    await validateAlertErrorMessage();
    passwordErrorLocator = page.getByTestId(loginPageSelectors.errorPassword);
    await expect(passwordErrorLocator).toHaveText(
      "User not found or password doesn't not match"
    );
    logger.info("Execution ended: Validation for invalid password");
  });

  test("Validation for Empty Email and Password Fields", async () => {
    logger.info(
      "Execution started: Validation for empty email and password fields"
    );
    await loginPage.loginToApplication("", "");
    await validateAlertErrorMessage();
    emailErrorLocator = page.getByTestId(loginPageSelectors.errorEmail);
    passwordErrorLocator = page.getByTestId(loginPageSelectors.errorPassword);
    await expect(emailErrorLocator).toHaveText("This field is required");
    await expect(passwordErrorLocator).toHaveText("This field is required");
    logger.info(
      "Execution ended: Validation for empty email and password fields"
    );
  });

  test("Validation for Invalid Email Address", async () => {
    await executeTest(
      testData.invalid_email,
      testData.password,
      "Validation for invalid email address"
    );
  });

  test("Validation for Unregistered User", async () => {
    await executeTest(
      testData.unregistered_email,
      testData.password,
      "Validation for unregistered user"
    );
  });
});

const executeTest = async (
  email: string,
  password: string,
  testName: string
) => {
  logger.info(`Execution started: ${testName}`);
  await loginPage.loginToApplication(email, password);
  await validateAlertErrorMessage();
  const errorMessage = "User not found or password doesn't not match";
  emailErrorLocator = page.getByTestId(loginPageSelectors.errorEmail);
  await expect(emailErrorLocator).toHaveText(errorMessage, { timeout: 10000 });
  logger.info(`Execution ended: ${testName}`);
};

async function validateAlertErrorMessage() {
  const parentAlertErrorElement = page.getByTestId(loginPageSelectors.alert);
  const parentAlertErrorText = await parentAlertErrorElement.textContent();
  const trimmedAlertErrorText = parentAlertErrorText?.replace("X", "").trim();
  expect(trimmedAlertErrorText).toBe("Unable to login");
}
