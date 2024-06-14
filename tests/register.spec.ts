import test, { chromium, expect, firefox } from "@playwright/test";
import { createHash } from "crypto";
import {
  deleteExistingScreenshots,
  setup,
  page,
  takeScreenshot,
  teardown,
} from "../src/base/base";
import { homePageSelectors } from "../src/pages/modules/home/HomePage";
import RegisterPage, {
  registerPageSelectors,
} from "../src/pages/modules/register/RegisterPage";
import { ENV } from "../src/utils/ENV";
import { getTestData } from "../src/utils/GetTestData";
import logger from "../src/utils/LoggerUtil";
import { describe } from "node:test";

test.describe.configure({ mode: "serial" });

let registerPage: RegisterPage;
let testData: any;

test.beforeAll(async () => {
  deleteExistingScreenshots();
});

test.beforeEach(async () => {
  test.setTimeout(60000);
  await setup(chromium);
  registerPage = new RegisterPage(page);
  await page.goto(ENV.BASE_URL);
  await expect(page).toHaveURL(ENV.BASE_URL);
  testData = getTestData(ENV.ENVIRONMENT);

  logger.info("Test setup completed for the following test case");
});

test.afterAll(async () => {
  await teardown();
  logger.info("Test teardown completed");
});

describe("Registration Test", () => {
  test("Successful Registration with Valid Credentials", async () => {
    logger.info(
      "Execution started: Successful registration with valid credentials"
    );
    const email_address_random = getRandomEmail();
    await registerPage.registerWithApplication(
      testData.full_name,
      email_address_random,
      testData.password,
      testData.confirm_password
    );
    let welcomeMessageLocator = page.getByTestId(
      homePageSelectors.welcomeMessage
    );
    await expect.soft(welcomeMessageLocator).toHaveText(`Welcome ${testData.full_name}, to logout click here`, { timeout: 15000 });
    logger.info(
      "Execution ended: Successful registration with valid credentials"
    );
  });

  test("Validation for Short Full Name Field Error Message", async () => {
    logger.info(
      "Execution started: Validation for short full name field error message"
    );
    await registerPage.registerWithApplication(
      testData.short_full_name,
      testData.new_email_address,
      testData.password,
      testData.confirm_password
    );
    validateAlertError();
    let nameErrorLocator = page.getByTestId(
      registerPageSelectors.errorFullName
    );
    await expect(nameErrorLocator).toHaveText(
      "fullName must be longer than or equal to 5 characters"
    );
    logger.info(
      "Execution ended: Validation for short full name field error message"
    );
  });

  test("Validation for Empty Your Name Field and Error Message", async () => {
    logger.info(
      "Execution started: Validation for empty full name field error message"
    );
    await registerPage.registerWithApplication(
      "",
      testData.new_email_address,
      testData.password,
      testData.confirm_password
    );
    validateAlertError();
    let nameErrorLocator = page.getByTestId(
      registerPageSelectors.errorFullName
    );
    await expect(nameErrorLocator).toHaveText("This field is required");
    logger.info(
      "Execution ended: Validation for empty full name field error message"
    );
  });

  test("Validation for Invalid Email Address 'already registered' and Error Message", async () => {
    logger.info(
      "Execution started: Validation for invalid email address error message"
    );
    await registerPage.registerWithApplication(
      testData.full_name,
      testData.email_address,
      testData.password,
      testData.confirm_password
    );
    validateAlertError();
    let emailErrorLocator = await page.getByTestId(
      registerPageSelectors.errorEmail
    );
    await expect(emailErrorLocator).toHaveText(
      "Email address already registered"
    );
    logger.info(
      "Execution ended: Validation for invalid email address error message"
    );
  });

  test("Validation for Invalid Password 'mismatch' and Error Message", async () => {
    logger.info(
      "Execution started: Validation for invalid password mismatch error message"
    );
    await registerPage.registerWithApplication(
      testData.full_name,
      testData.email_address,
      testData.password,
      testData.mismatch_confirm_password
    );
    validateAlertError();
    let confirmPasswordErrorLocator = page.getByTestId(
      registerPageSelectors.errorPasswordConfirm
    );
    await expect(confirmPasswordErrorLocator).toHaveText(
      "Passwords do not match"
    );
    logger.info(
      "Execution ended: Validation for invalid password mismatch error message"
    );
  });

  test("Validation for Empty All Fields Error Message", async () => {
    logger.info(
      "Execution started: Validation for empty all fields error message"
    );
    await registerPage.registerWithApplication("", "", "", "");
    validateAlertError();
    let nameErrorLocator = page.getByTestId(
      registerPageSelectors.errorFullName
    );
    let emailErrorLocator = page.getByTestId(registerPageSelectors.errorEmail);
    let passwordErrorLocator = page.getByTestId(
      registerPageSelectors.errorPassword
    );
    await expect(nameErrorLocator).toHaveText("This field is required");
    await expect(emailErrorLocator).toHaveText("This field is required");
    await expect(passwordErrorLocator).toHaveText("This field is required");
    logger.info(
      "Execution ended: Validation for empty all fields error message"
    );
  });

  test("Email Validation Tests", async () => {
    logger.info("Execution started: Email validation tests");
    const emailTests = [
      {
        email: testData.missing_atsign_email,
        password: testData.password,
        confirmPassword: testData.confirm_password,
        expectedMessage: "email must be an email",
      },
      {
        email: testData.missing_domain_email,
        password: testData.password,
        confirmPassword: testData.confirm_password,
        expectedMessage: "email must be an email",
      },
      {
        email: testData.missing_local_email,
        password: testData.password,
        confirmPassword: testData.confirm_password,
        expectedMessage: "email must be an email",
      },
      {
        email: testData.spl_char_domain_email,
        password: testData.password,
        confirmPassword: testData.confirm_password,
        expectedMessage: "email must be an email",
      },
    ];

    for (const {
      email,
      password,
      confirmPassword,
      expectedMessage,
    } of emailTests) {
      logger.info(`Validate Email Error Message for '${email}'`);
      await registerPage.registerWithApplication(
        testData.full_name,
        email,
        password,
        confirmPassword
      );
      await validateEmailError(expectedMessage);
    }
    logger.info("Execution ended: Email validation tests");
  });

  test("Password Validation Tests", async () => {
    logger.info("Execution started: Password validation tests");
    const passwordTests = [
      {
        password: testData.non_numeric_password,
        expectedMessage:
          "Password should contain characters of multiple register, numbers and special characters",
        description: "Non-Numeric Password Validation",
      },
      {
        password: testData.only_alpha_password,
        expectedMessage:
          "Password should contain characters of multiple register, numbers and special characters",
        description: "Only Alphabetical Password Validation",
      },
      {
        password: testData.only_numeric_password,
        expectedMessage:
          "Password should contain characters of multiple register, numbers and special characters",
        description: "Only Numeric Password Validation",
      },
      {
        password: testData.only_spl_char_password,
        expectedMessage:
          "Password should contain characters of multiple register, numbers and special characters",
        description: "Only Special Character Password Validation",
      },
      {
        password: testData.non_spl_char_password,
        expectedMessage:
          "Password should contain characters of multiple register, numbers and special characters",
        description: "Non-Special Character Password Validation",
      },
    ];

    for (const { password, expectedMessage } of passwordTests) {
      const email_address_random = getRandomEmail();
      await registerPage.registerWithApplication(
        testData.full_name,
        email_address_random,
        password,
        password
      );
      validateAlertError();
      await validatePasswordError(expectedMessage);
      logger.info("Execution ended: Password validation tests");
    }
  });
});

const validateEmailError = async (
  expectedMessage: string | RegExp | (string | RegExp)[]
) => {
  try {
    const emailErrorLocator = await page.getByTestId(
      registerPageSelectors.errorEmail
    );
    await expect.soft(emailErrorLocator).toHaveText(expectedMessage);
    logger.info("Validation email error passed");
  } catch (error) {
    logger.error(
      "Error occurred while locating or validating email error element:",
      error
    );
    logger.warn(
      "Soft assertion: Email error message validation failed but continuing with the test."
    );
  }
};

async function validatePasswordError(
  expectedMessage: string | RegExp | readonly (string | RegExp)[]
) {
  try {
    const passwordErrorLocator = await page.getByTestId(
      registerPageSelectors.errorPassword
    );
    await expect.soft(passwordErrorLocator).toHaveText(expectedMessage);
    logger.info("Validation password error passed");
  } catch (error) {
    logger.error(
      "Error occurred while locating or validating password error element:",
      error
    );
    logger.warn(
      "Soft assertion: Password error message validation failed but continuing with the test."
    );
  }
}

async function validateAlertError() {
  const parentAlertErrorElement = await page.getByTestId(
    registerPageSelectors.alert
  );
  const parentAlertErrorText = await parentAlertErrorElement.textContent();
  const trimmedAlertErrorText = parentAlertErrorText?.replace("X", "").trim();
  expect.soft(trimmedAlertErrorText).toBe("Unable to register user");
  logger.info("Validation alert error passed");
}

const getRandomEmail = (): string => {
  const randomString = createHash("md5")
    .update(Math.random().toString())
    .digest("hex")
    .substring(0, 8);
  const domain = "@example.com";
  return `random_${randomString}${domain}`;
};


