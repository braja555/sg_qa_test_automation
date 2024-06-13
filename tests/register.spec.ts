
import test, { chromium, expect, firefox } from "@playwright/test";
import { createHash } from "crypto";
import { deleteExistingScreenshots, setup, page, takeScreenshot, teardown } from "../src/base/base";
import { homePageSelectors } from "../src/pages/modules/home/HomePage";
import RegisterPage, { registerPageSelectors } from "../src/pages/modules/register/RegisterPage";
import { ENV } from "../src/utils/ENV";
import { getTestData } from "../src/utils/GetTestData";

test.describe.configure({ mode: "serial" });

let registerPage: RegisterPage;
let testData: any;

test.beforeAll(async () => {
  deleteExistingScreenshots();
})

test.beforeEach(async () => {
  await setup(chromium);
  registerPage = new RegisterPage(page);
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

// test("TC-01 Successful Registration - Valid Credentials", async () => {
//   const email_address_random = getRandomEmail();
//   await registerPage.registerWithApplication(
//     testData.full_name,
//     email_address_random,
//     testData.password,
//     testData.confirm_password
//   );
//   let welcomeMessageLocator = page.getByTestId(
//     homePageSelectors.welcomeMessage
//   );
//   await expect(welcomeMessageLocator).toHaveText(
//     `Welcome ${testData.full_name}, to logout click here`
//   );
// });

// test("TC-02 Short Full Name Field Error Message Validation", async () => {
//   await registerPage.registerWithApplication(
//     testData.short_full_name,
//     testData.new_email_address,
//     testData.password,
//     testData.confirm_password
//   );
//   validateAlertError();
//   let nameErrorLocator = page.getByTestId(registerPageSelectors.errorFullName);
//   await expect(nameErrorLocator).toHaveText(
//     "fullName must be longer than or equal to 5 characters"
//   );
// });

// test("TC-03 Empty Only Your Name Field And Error Message Validation", async () => {
//   await registerPage.registerWithApplication(
//     "",
//     testData.new_email_address,
//     testData.password,
//     testData.confirm_password
//   );
//   validateAlertError();
//   let nameErrorLocator = page.getByTestId(registerPageSelectors.errorFullName);
//   await expect(nameErrorLocator).toHaveText("This field is required");
// });

// test("TC-04 Invalid Email Address 'same email registering' And Error Message Validation", async () => {
//   await registerPage.registerWithApplication(
//     testData.full_name,
//     testData.email_address,
//     testData.password,
//     testData.confirm_password
//   );
//   validateAlertError();
//   let emailErrorLocator = await page.getByTestId(
//     registerPageSelectors.errorEmail
//   );
//   await expect(emailErrorLocator).toHaveText(
//     "Email address already registered"
//   );
// });

// test("TC-05 Invalid Password 'password mismatch' And Error Message Validation", async () => {
//   await registerPage.registerWithApplication(
//     testData.full_name,
//     testData.email_address,
//     testData.password,
//     testData.mismatch_confirm_password
//   );
//   validateAlertError();
//   let confirmPasswordErrorLocator = page.getByTestId(
//     registerPageSelectors.errorPasswordConfirm
//   );
//   await expect(confirmPasswordErrorLocator).toHaveText(
//     "Passwords do not match"
//   );
// });

// test("TC-06 Email Validation Tests", async () => {
//   const emailTests = [
//     {
//       email: testData.missing_atsign_email,
//       password: testData.password,
//       confirmPassword: testData.confirm_password,
//       expectedMessage: "email must be an email",
//     },
//     {
//       email: testData.missing_domain_email,
//       password: testData.password,
//       confirmPassword: testData.confirm_password,
//       expectedMessage: "email must be an email",
//     },
//     {
//       email: testData.missing_local_email,
//       password: testData.password,
//       confirmPassword: testData.confirm_password,
//       expectedMessage: "email must be an email",
//     },
//     {
//       email: testData.spl_char_domain_email,
//       password: testData.password,
//       confirmPassword: testData.confirm_password,
//       expectedMessage: "email must be an email",
//     },
//   ];

//   for (const {
//     email,
//     password,
//     confirmPassword,
//     expectedMessage,
//   } of emailTests) {
//     const testDescription = `Validate Email Error Message for '${email}'`;
//     console.log(testDescription);
//     validateAlertError();
//     await validateEmailError(email, password, confirmPassword, expectedMessage);
//   }
// });

// test("TC-07 Password Validation Tests", async () => {
//   const passwordTests = [
//     {
//       password: testData.non_numeric_password,
//       expectedMessage:
//         "Password should contain characters of multiple register, numbers and special characters",
//       description: "TC-07.01: Non-Numeric Password Validation",
//     },
//     {
//       password: testData.only_alpha_password,
//       expectedMessage:
//         "Password should contain characters of multiple register, numbers and special characters",
//       description: "TC-07.02: Only Alphabetical Password Validation",
//     },
//     {
//       password: testData.only_numeric_password,
//       expectedMessage:
//         "Password should contain characters of multiple register, numbers and special characters",
//       description: "TC-07.03: Only Numeric Password Validation",
//     },
//     {
//       password: testData.only_spl_char_password,
//       expectedMessage:
//         "Password should contain characters of multiple register, numbers and special characters",
//       description: "TC-07.04: Only Special Character Password Validation",
//     },
//     {
//       password: testData.non_spl_char_password,
//       expectedMessage:
//         "Password should contain characters of multiple register, numbers and special characters",
//       description: "TC-07.05: Non-Special Character Password Validation",
//     },
//   ];

//   for (const { password, expectedMessage, description } of passwordTests) {
//     try {
//       const email_address_random = getRandomEmail();
//       await registerPage.registerWithApplication(
//         testData.full_name,
//         email_address_random,
//         password,
//         password
//       );
//       validateAlertError();
//       await validatePasswordError(expectedMessage);
//     } catch (error) {
//       console.error(`Test Case Description: ${description} - FAILED`, error);
//     }
//   }
// });

// test("TC-08 Empty All Fields Error Message Validation", async () => {
//   await registerPage.registerWithApplication("", "", "", "");
//   validateAlertError();
//   let nameErrorLocator = page.getByTestId(registerPageSelectors.errorFullName);
//   let emailErrorLocator = page.getByTestId(registerPageSelectors.errorEmail);
//   let passwordErrorLocator = page.getByTestId(
//     registerPageSelectors.errorPassword
//   );
//   await expect(nameErrorLocator).toHaveText("This field is required");
//   await expect(emailErrorLocator).toHaveText("This field is required");
//   await expect(passwordErrorLocator).toHaveText("This field is required");
// });

// const validateEmailError = async (
//   email: string,
//   password: string,
//   confirmPassword: string,
//   expectedMessage: string | RegExp | (string | RegExp)[]
// ) => {
//   await registerPage.registerWithApplication(
//     testData.full_name,
//     email,
//     password,
//     confirmPassword
//   );
//   validateAlertError();
//   try {
//     const emailErrorLocator = await page.getByTestId(
//       registerPageSelectors.errorEmail
//     );
//     await expect.soft(emailErrorLocator).toHaveText(expectedMessage);
//   } catch (error) {
//     console.error(
//       "Error occurred while locating or validating email error element:", error
//     );
//     console.warn(
//       "Soft assertion: Email error message validation failed but continuing with the test."
//     );
//   }
// };

// async function validatePasswordError(
//   expectedMessage: string | RegExp | readonly (string | RegExp)[]
// ) {
//   try {
//     const passwordErrorLocator = await page.getByTestId(
//       registerPageSelectors.errorPassword
//     );
//     await expect.soft(passwordErrorLocator).toHaveText(expectedMessage);
//   } catch (error) {
//     console.error(
//       "Error occurred while locating or validating password error element:",
//       error
//     );
//     console.warn(
//       "Soft assertion: Password error message validation failed but continuing with the test."
//     );
//   }
// }

// async function validateAlertError() {
//   const parentAlertErrorElement = await page.getByTestId(
//     registerPageSelectors.alert
//   );
//   const parentAlertErrorText = await parentAlertErrorElement.textContent();
//   // Exclude 'X' character from the parent div text content to assert the error message
//   const trimmedAlertErrorText = parentAlertErrorText?.replace("X", "").trim();
//   expect(trimmedAlertErrorText).toBe("Unable to register user");
// }

// const getRandomEmail = (): string => {
//   const randomString = createHash("md5")
//     .update(Math.random().toString())
//     .digest("hex")
//     .substring(0, 8); // Generate a random string
//   const domain = "@example.com"; // Define the domain
//   return `random_${randomString}${domain}`;
// };
