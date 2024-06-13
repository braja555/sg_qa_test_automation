import { Locator, Page } from "@playwright/test";

type HomePageSelectors = {
  readonly userDetailList: string;
  readonly welcomeMessage: string;
  readonly hereLink: string;
  readonly alert: string;
};

export const homePageSelectors: HomePageSelectors = {
  userDetailList:
    "//table[@data-testid='user-table']//following::td[starts-with(@data-testid, 'user')]",
  welcomeMessage: "welcome-message",
  hereLink: "logout",
  alert: "alert",
};

export default class HomePage {
  constructor(private page: Page) {}

  public async verifyUserDetailInList(
    emailAddress?: string,
    username?: string
  ): Promise<string | null | undefined> {
    await this.page.waitForSelector(homePageSelectors.userDetailList);
    const usersDetailElements = await this.page.$$(
      homePageSelectors.userDetailList
    );

    for (const userDetailElement of usersDetailElements) {
      const userDetailText = await userDetailElement.textContent();
      if (
        (emailAddress && userDetailText?.includes(emailAddress)) ||
        (username && userDetailText?.includes(username))
      ) {
        return userDetailText.trim();
      }
    }
    return null || undefined;
  }

  public async verifyHereIsLinkInWelcomeMessage(): Promise<Locator | null> {
    const hereLinkLocator = this.page.getByTestId(homePageSelectors.hereLink);
    return hereLinkLocator || null;
  }

  public async logoutApplication(): Promise<void> {
    const logout = this.page.getByTestId(homePageSelectors.hereLink);
    if (!logout) {
      throw new Error("Logout link not found.");
    }
    await logout.click();
  }
}
