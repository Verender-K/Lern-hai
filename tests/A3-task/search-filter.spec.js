import { test, expect } from "@playwright/test";

test("Search for a product, apply filters and verify results", async ({
  page,
}) => {
  // Step 1: Open website
  await page.goto("https://practicesoftwaretesting.com/");

  // Step 2: Search for Hammer
  const searchKeyword = "hammer";

  await page.locator('[data-test="search-query"]').fill(searchKeyword);

  // Step 3: Click Search button
  await page.locator('[data-test="search-submit"]').click();

  // Step 4: Verify search results
  const products = page.locator('[data-test="product-name"]');

  await expect(products.first()).toContainText(/hammer/i);

  // Step 5: Apply Hand Tools category filter
  const category = page.getByRole("checkbox", {
    name: "Hammer",
    exact: true,
  });

  await category.check();
  await page.waitForTimeout(3000);

  // Step 6: Verify filter is applied
  await expect(category).toBeChecked();

  // Step 7: Verify matching products
  await expect(products.first()).toBeVisible();

  await expect(products).not.toHaveCount(0);

  await expect
    .poll(async () => {
      const names = await products.allTextContents();

      return (
        names.length > 0 &&
        names.every((name) => name.toLowerCase().includes(searchKeyword))
      );
    })
    .toBe(true);

  // Step 8: Display results
  const productCount = await products.count();

  console.log("Total products found:", productCount);

  for (let i = 0; i < productCount; i++) {
    console.log("Product:", await products.nth(i).innerText());
  }

  console.log("Search and filter verification successful");
  await page.waitForTimeout(5000);
});