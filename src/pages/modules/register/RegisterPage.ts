import { ElementHandle, Locator, Page } from "@playwright/test";

type RegisterPageSelectors = {
  readonly registerNav: string;
  readonly yourNameTxt: string;
  readonly yourNameInput: string;
  readonly emailTxt: string;
  readonly emailInput: string;
  readonly passwordTxt: string;
  readonly passwordInput: string;
  readonly confirmPasswordTxt: string;
  readonly confirmPasswordInput: string;
  readonly submitButton: string;
  readonly errorFullName: string;
  readonly errorEmail: string;
  readonly errorPassword: string;
  readonly errorPasswordConfirm: string;
  readonly hereLink: string;
  readonly alert: string;

};

export const registerPageSelectors: RegisterPageSelectors = {
  registerNav: 'register-nav',
  yourNameTxt: 'your-name-txt',
  yourNameInput: 'input-your-name',
  emailTxt: 'email-txt',
  emailInput: 'input-email',
  passwordTxt: "password-txt",
  passwordInput: 'input-pwd',
  confirmPasswordTxt: 'confirm-password-txt',
  confirmPasswordInput: 'input-confirm-pwd',
  submitButton: 'submit-btn',
  errorFullName: 'error-fullName',
  errorEmail: 'error-email',
  errorPassword: 'error-password',
  errorPasswordConfirm: 'error-passwordConfirmation',
  hereLink: 'logout',
  alert: 'alert'
};

export default class RegisterPage {
  constructor(private page: Page) {
  }



  public async registerWithApplication(
    userfullname: string,
    emailaddress: string,
    password: string,
    confirm_password: string
  ): Promise<void> {
    await this.navigateToRegister();
    await this.enterUserFullName(userfullname);
    await this.enterEmailAddress(emailaddress);
    await this.enterPassword(password);
    await this.enterConfirmPassword(confirm_password);
    await this.clickSubmitButton();
  }

  public async navigateToRegister(): Promise<void> {
    this.page.reload();
    await this.page.getByTestId(registerPageSelectors.registerNav).click();
  }

  private async enterUserFullName(userfullname: string): Promise<void> {
    const fullNameInput = this.page.getByTestId(registerPageSelectors.yourNameInput);
    await fullNameInput.clear();
    await fullNameInput.fill(userfullname);
  }

  private async enterEmailAddress(emailaddress: string): Promise<void> {
    const emailInput = this.page.getByTestId(registerPageSelectors.emailInput);
    await emailInput.clear();
    await emailInput.fill(emailaddress);
  }

  private async enterPassword(password: string): Promise<void> {
    const passwordInput = this.page.getByTestId(registerPageSelectors.passwordInput);
    await passwordInput.clear();
    await passwordInput.fill(password);
  }

  private async enterConfirmPassword(confirm_password: string): Promise<void> {
    const confirmPasswordInput = this.page.getByTestId(
      registerPageSelectors.confirmPasswordInput
    );
    await confirmPasswordInput.clear();
    await confirmPasswordInput.fill(confirm_password);
  }

  private async clickSubmitButton(): Promise<void> {
    await this.page.getByTestId(registerPageSelectors.submitButton).click();
  }

  public async logoutApplication(): Promise<void> {
    const logout = this.page.getByTestId(registerPageSelectors.hereLink);
    await logout.click();
  }
}
