import { test, expect } from "@playwright/test";

test("Sort products by name and price and verify order", async ({ page }) => {

  // Increase timeout to accommodate visual delays
  test.setTimeout(60000);

  // Step 1: Open website
  await page.goto("https://practicesoftwaretesting.com/");
  await page.waitForTimeout(2000);

  const sortDropdown = page.locator('[data-test="sort"]');
  const productNames = page.locator('[data-test="product-name"]');
  const productPrices = page.locator('[data-test="product-price"]');

  await expect(productNames.first()).toBeVisible();

  // Step 2: Sort by Name (A-Z)
  await sortDropdown.selectOption({ label: "Name (A - Z)" });
  await page.waitForTimeout(3000);

  const namesAscending = (await productNames.allTextContents())
    .map(name => name.trim());

  const expectedNamesAscending = [...namesAscending].sort(
    (a, b) => a.localeCompare(b)
  );

  expect(namesAscending.length).toBeGreaterThan(1);
  expect(namesAscending).toEqual(expectedNamesAscending);

  console.log("Name (A-Z):", namesAscending);
  console.log("Name ascending sorting passed");

  // Step 3: Sort by Name (Z-A)
  await sortDropdown.selectOption({ label: "Name (Z - A)" });
  await page.waitForTimeout(3000);

  const namesDescending = (await productNames.allTextContents())
    .map(name => name.trim());

  const expectedNamesDescending = [...namesDescending].sort(
    (a, b) => b.localeCompare(a)
  );

  expect(namesDescending.length).toBeGreaterThan(1);
  expect(namesDescending).toEqual(expectedNamesDescending);

  console.log("Name (Z-A):", namesDescending);
  console.log("Name descending sorting passed");

  // Step 4: Sort by Price (Low-High)
  await sortDropdown.selectOption({ label: "Price (Low - High)" });
  await page.waitForTimeout(3000);

  const pricesAscending = (await productPrices.allTextContents())
    .map(price => Number(price.replace(/[^0-9.]/g, "")));

  const expectedPricesAscending = [...pricesAscending].sort(
    (a, b) => a - b
  );

  expect(pricesAscending.length).toBeGreaterThan(1);
  expect(pricesAscending).toEqual(expectedPricesAscending);

  console.log("Price (Low-High):", pricesAscending);
  console.log("Price ascending sorting passed");

  // Step 5: Sort by Price (High-Low)
  await sortDropdown.selectOption({ label: "Price (High - Low)" });
  await page.waitForTimeout(3000);

  const pricesDescending = (await productPrices.allTextContents())
    .map(price => Number(price.replace(/[^0-9.]/g, "")));

  const expectedPricesDescending = [...pricesDescending].sort(
    (a, b) => b - a
  );

  expect(pricesDescending.length).toBeGreaterThan(1);
  expect(pricesDescending).toEqual(expectedPricesDescending);

  console.log("Price (High-Low):", pricesDescending);
  console.log("Price descending sorting passed");

  // Step 6: Final verification
  console.log("All sorting scenarios passed successfully");

  await page.waitForTimeout(5000);
});