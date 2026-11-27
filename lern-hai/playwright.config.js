// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL,
    testIdAttribute: "data-test",

    trace: "on-first-retry",

    screenshot: "only-on-failure",
  },

  projects: [
    // Authentication setup for A2
    {
      name: "setup",
      testMatch: "**/A2-task/auth.setup.js",
    },

    // Customer tests using saved authentication
    {
      name: "customer",
      testMatch: "**/A2-task/*.spec.js",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/customer.json",
      },
    },

    // Chromium
    {
      name: "chromium",
      testIgnore: "**/A2-task/**",
      use: { ...devices["Desktop Chrome"] },
    },

    // Firefox
    {
      name: "firefox",
      testIgnore: "**/A2-task/**",
      use: { ...devices["Desktop Firefox"] },
    },

    // WebKit
    {
      name: "webkit",
      testIgnore: "**/A2-task/**",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});