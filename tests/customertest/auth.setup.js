import { test as setup, expect } from "@playwright/test";

setup("Login and save customer session", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/auth/login");

  await page.locator('[data-test="email"]').fill("customer@practicesoftwaretesting.com");

  await page.locator('[data-test="password"]').fill("welcome01");

  await page.locator('[data-test="login-submit"]').click();

  await expect(page).toHaveURL(/\/account/);

  // Save authenticated session
  await page.context().storageState({
    path: "playwright/.auth/customer.json",
  });

  console.log("Customer session saved successfully");
});