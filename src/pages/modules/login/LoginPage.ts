import { Page } from "@playwright/test";

type LoginPageSelectors = {
  readonly loginNavigationLink: string;
  readonly loginEmailInput: string;
  readonly loginPasswordInput: string;
  readonly submitButton: string;
  readonly logoutButton: string;
  readonly errorEmail: string;
  readonly errorPassword: string;
  readonly alert: string;
};

export const loginPageSelectors: LoginPageSelectors = {
  loginNavigationLink: 'login-nav',
  loginEmailInput: 'email-input',
  loginPasswordInput: 'password-input',
  submitButton: 'submit-btn',
  logoutButton: 'logout',
  errorEmail: 'error-email',
  errorPassword: 'error-password',
  alert: 'alert'
};

export default class LoginPage {
  constructor(private page: Page) {
  }

  public async loginToApplication(emailAddress: string, password: string) {
    await this.clickLoginNavigator();
    await this.enterEmailAddress(emailAddress);
    await this.enterPassword(password);
    await this.clickSubmitButton();
  }

  private async clickLoginNavigator() {
    await this.page.getByTestId(loginPageSelectors.loginNavigationLink).click();
  }

  private async enterEmailAddress(emailAddress: string) {
    const emailInput = await this.page.getByTestId(loginPageSelectors.loginEmailInput);
    await emailInput.clear();
    await emailInput.fill(emailAddress);
  }

  private async enterPassword(password: string) {
    const passwordInput = await this.page.getByTestId(loginPageSelectors.loginPasswordInput);
    await passwordInput.clear();
    await passwordInput.fill(password);
  }

  async clickSubmitButton() {
    await this.page
    .getByTestId(loginPageSelectors.submitButton)
    .click()
    .catch((error) => {
      console.error(`Error clicking Submit button: ${error}`);
      throw error;
    });
  }
}
