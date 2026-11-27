export class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.emailInput = page.getByTestId("email");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-submit");
  }

  // Open login page
  async goto() {
    await this.page.goto("/auth/login");
  }

  // Login with provided credentials
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}