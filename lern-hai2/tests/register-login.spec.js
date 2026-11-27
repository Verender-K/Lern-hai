import { test, expect } from "@playwright/test";

test("Register user through API and login through UI", async ({
  request,
  page,
}) => {
  // Step 1: Generate unique user credentials
  const email = `testuser${Date.now()}@example.com`;
  const password = `Kv9@xR7${Date.now()}`;

  // Step 2: Prepare registration data
  const userData = {
    first_name: "John",
    last_name: "Smith",
    dob: "1998-05-15",
    phone: "2025550147",
    email: email,
    password: password,
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "New York",
      country: "US",
      postal_code: "10001",
    },
  };

  // Step 3: Register user through API
  const response = await request.post(
    "https://api.practicesoftwaretesting.com/users/register",
    {
      data: userData,
    }
  );

  // Step 4: Verify API response
  console.log("Registration Status:", response.status());
  console.log("Response Body:", await response.text());

  expect(response.status(), await response.text()).toBe(201);

  console.log("User registered successfully");
  console.log("Registered Email:", email);

  // Step 5: Open login page
  await page.goto("https://practicesoftwaretesting.com/auth/login");

  // Step 6: Enter registered credentials
  await page.locator('[data-test="email"]').fill(email);
  await page.locator('[data-test="password"]').fill(password);

  // Step 7: Click Login button
  await page.locator('[data-test="login-submit"]').click();

  // Step 8: Verify successful login
  await expect(page).toHaveURL(/\/account/);

  await expect(
    page.locator('[data-test="page-title"]')
  ).toHaveText("My account");

  await expect(
    page.locator('[data-test="nav-menu"]')
  ).toContainText("John Smith");

  console.log("User logged in successfully");
});