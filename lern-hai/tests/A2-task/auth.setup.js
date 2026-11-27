import { test as setup } from "@playwright/test";
import { UserAPI } from "../../api/UserAPI.js";
import { generateUserData } from "../../utils/testData.js";
import { LoginPage } from "../../pages/LoginPage.js";
import { AccountPage } from "../../pages/AccountPage.js";

setup("Register customer, login and save session", async ({
  request,
  page,
}) => {
  // Initialize API and Page Objects
  const userAPI = new UserAPI(request);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  // Step 1: Generate unique customer data
  const userData = generateUserData();

  // Step 2: Register customer through API
  await userAPI.registerUser(userData);

  // Step 3: Login through UI
  await loginPage.goto();
  await loginPage.login(userData.email, userData.password);

  // Step 4: Verify successful login
  await accountPage.verifyAccountPage();

  await accountPage.verifyLoggedInUser(
    userData.first_name,
    userData.last_name
  );

  // Step 5: Save authenticated session
  await page.context().storageState({
    path: "playwright/.auth/customer.json",
  });

  console.log("Customer registered successfully");
  console.log("Customer session saved successfully");
});