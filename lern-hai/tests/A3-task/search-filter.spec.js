import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage.js";

test("Search for a product, apply filters and verify results", async ({
  page,
}) => {
  // Initialize Page Object
  const homePage = new HomePage(page);

  // Prepare test data
  const searchKeyword = "hammer";
  const categoryName = "Hand Tools";

  // Step 1: Open homepage
  await homePage.goto();

  // Step 2: Search for a product
  await homePage.searchProduct(searchKeyword);

  // Step 3: Verify search results
  await homePage.verifySearchResults(searchKeyword);

  // Step 4: Apply category filter
  await homePage.applyCategoryFilter(categoryName);

  // Step 5: Verify filtered search results
  await homePage.verifySearchResults(searchKeyword);

  // Step 6: Display product results
  const products = await homePage.getProductNames();

  console.log("Applied category:", categoryName);
  console.log("Total displayed products:", products.length);
  console.log("Products:", products);

  console.log("Search and filter verification successful");
});