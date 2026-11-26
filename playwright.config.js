// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 1,

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    // Authentication setup
    {
      name: 'setup',
      testMatch: '**/customertest/auth.setup.js',
    },

    // Customer tests with saved session
    {
      name: 'customer',
      testMatch: '**/customertest/*.spec.js',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/customer.json',
      },
    },

    // Normal Chromium tests
    {
      name: 'chromium',
      testIgnore: '**/customertest/**',
      use: { ...devices['Desktop Chrome'] },
    },

    // Normal Firefox tests
    {
      name: 'firefox',
      testIgnore: '**/customertest/**',
      use: { ...devices['Desktop Firefox'] },
    },

    // Normal WebKit tests
    {
      name: 'webkit',
      testIgnore: '**/customertest/**',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});