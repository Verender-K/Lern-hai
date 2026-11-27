import { expect } from "@playwright/test";

export class AccountPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.pageTitle = page.getByTestId("page-title");
    this.navMenu = page.getByTestId("nav-menu");
  }

  // Open account page
  async goto() {
    await this.page.goto("/account");
  }

  // Verify account page
  async verifyAccountPage() {
    await expect(this.page).toHaveURL(/\/account$/);
    await expect(this.pageTitle).toHaveText("My account");
  }

  // Verify logged-in customer
  async verifyLoggedInUser(firstName, lastName) {
    await expect(this.navMenu).toContainText(
      `${firstName} ${lastName}`
    );
  }
}