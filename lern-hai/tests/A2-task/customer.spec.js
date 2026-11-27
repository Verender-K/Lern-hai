import { test } from "@playwright/test";
import { AccountPage } from "../../pages/AccountPage.js";
import { HomePage } from "../../pages/HomePage.js";

test("Verify customer account page using saved session", async ({ page }) => {
  // Initialize Page Object
  const accountPage = new AccountPage(page);

  // Step 1: Open account page
  await accountPage.goto();

  // Step 2: Verify account page
  await accountPage.verifyAccountPage();

  // Step 3: Verify logged-in customer
  await accountPage.verifyLoggedInUser("John", "Smith");

  console.log("Account accessed without logging in again");
});

test("Verify customer remains logged in on homepage", async ({ page }) => {
  // Initialize Page Object
  const homePage = new HomePage(page);

  // Step 1: Open homepage
  await homePage.goto();

  // Step 2: Verify logged-in customer
  await homePage.verifyLoggedInUser("John", "Smith");

  console.log("Customer session reused successfully");
});