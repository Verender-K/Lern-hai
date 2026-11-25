import { test, expect } from "@playwright/test";

test("Verify customer account page", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/account");

  await expect(page).toHaveURL(/\/account/);

  await expect(
    page.locator('[data-test="page-title"]')
  ).toHaveText("My account");

  console.log("Account accessed without logging in again");
});

test("Verify customer remains logged in on homepage", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");

  await expect(
    page.locator('[data-test="nav-menu"]')
  ).toBeVisible();

  console.log("Customer session reused successfully");
});