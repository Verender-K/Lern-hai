import { test } from "@playwright/test";
import { UserAPI } from "../../api/UserAPI.js";
import { generateUserData } from "../../utils/testData.js";
import { LoginPage } from "../../pages/LoginPage.js";
import { AccountPage } from "../../pages/AccountPage.js";

test("Register user through API and login through UI", async ({
  request,
  page,
}) => {
  // Initialize API and Page Objects
  const userAPI = new UserAPI(request);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  // Step 1: Generate unique user data
  const userData = generateUserData();

  // Step 2: Register user through API
  await userAPI.registerUser(userData);

  console.log("User registered successfully");
  console.log("Registered email:", userData.email);

  // Step 3: Open login page
  await loginPage.goto();

  // Step 4: Login through UI
  await loginPage.login(userData.email, userData.password);

  // Step 5: Verify successful login
  await accountPage.verifyAccountPage();

  // Step 6: Verify customer name
  await accountPage.verifyLoggedInUser(
    userData.first_name,
    userData.last_name
  );

  console.log("User logged in successfully");
});