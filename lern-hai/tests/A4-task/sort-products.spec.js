import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage.js";

// Test 1: Name sorting A-Z
test("Verify products are sorted by name A-Z", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  await homePage.sortProducts("Name (A - Z)");

  await homePage.verifyNameSorting("asc");

  console.log("Name ascending sorting passed");
});

// Test 2: Name sorting Z-A
test("Verify products are sorted by name Z-A", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  await homePage.sortProducts("Name (Z - A)");

  await homePage.verifyNameSorting("desc");

  console.log("Name descending sorting passed");
});

// Test 3: Price sorting Low-High
test("Verify products are sorted by price Low-High", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  await homePage.sortProducts("Price (Low - High)");

  await homePage.verifyPriceSorting("asc");

  console.log("Price ascending sorting passed");
});

// Test 4: Price sorting High-Low
test("Verify products are sorted by price High-Low", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  await homePage.sortProducts("Price (High - Low)");

  await homePage.verifyPriceSorting("desc");

  console.log("Price descending sorting passed");
});