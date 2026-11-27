import { expect } from "@playwright/test";

export class HomePage {
  constructor(page) {
    this.page = page;

    // Search locators
    this.searchInput = page.getByTestId("search-query");
    this.searchButton = page.getByTestId("search-submit");

    // Product locators
    this.productNames = page.getByTestId("product-name");
    this.productPrices = page.getByTestId("product-price");

    // Sorting locator
    this.sortDropdown = page.getByTestId("sort");

    // Customer navigation
    this.navMenu = page.getByTestId("nav-menu");
  }

  // Open homepage
  async goto() {
    await this.page.goto("/");
    await expect(this.productNames.first()).toBeVisible();
  }

  // Search for a product
  async searchProduct(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  // Apply category filter
  async applyCategoryFilter(categoryName) {
    const category = this.page.getByRole("checkbox", {
      name: categoryName,
      exact: true,
    });

    await category.check();
    await expect(category).toBeChecked();
  }

  // Select sorting option
  async sortProducts(option) {
    await this.sortDropdown.selectOption({ label: option });
  }

  // Get displayed product names
  async getProductNames() {
    const names = await this.productNames.allTextContents();

    return names.map((name) => name.trim());
  }

  // Get displayed product prices
  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();

    return prices.map((price) =>
      Number(price.replace(/[^0-9.]/g, ""))
    );
  }

  // Verify product search results
  async verifySearchResults(keyword) {
    await expect
      .poll(async () => {
        const names = await this.getProductNames();

        return (
          names.length > 0 &&
          names.every((name) =>
            name.toLowerCase().includes(keyword.toLowerCase())
          )
        );
      })
      .toBe(true);
  }

  // Verify name sorting
  async verifyNameSorting(order) {
    await expect
      .poll(async () => {
        const actualNames = await this.getProductNames();

        const expectedNames = [...actualNames].sort((a, b) =>
          order === "asc"
            ? a.localeCompare(b)
            : b.localeCompare(a)
        );

        return (
          actualNames.length > 1 &&
          actualNames.every(
            (name, index) => name === expectedNames[index]
          )
        );
      })
      .toBe(true);
  }

  // Verify price sorting
  async verifyPriceSorting(order) {
    await expect
      .poll(async () => {
        const actualPrices = await this.getProductPrices();

        const expectedPrices = [...actualPrices].sort((a, b) =>
          order === "asc" ? a - b : b - a
        );

        return (
          actualPrices.length > 1 &&
          actualPrices.every(
            (price, index) => price === expectedPrices[index]
          )
        );
      })
      .toBe(true);
  }

  // Verify logged-in customer
  async verifyLoggedInUser(firstName, lastName) {
    await expect(this.navMenu).toContainText(
      `${firstName} ${lastName}`
    );
  }
}