// @ts-check
import { defineConfig, devices } from '@playwright/test';
const fs = require('fs');
//import { request } from 'http';


/**
 * @see https://playwright.dev/docs/test-configuration
 */

// function generateUUID() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     var r = Math.random() * 16 | 0,
//       v = c === 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }

export default defineConfig({

  globalSetup: require.resolve('./global-setup.js'),

  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 90 * 1000,
  expect: {
    timeout: 90000
  },
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-result.json' }],
    ['./csv-reporter.js']
  ],



  use: {
    baseURL: 'http://localhost:3000', // base URL
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
    browserName: 'chromium',
    headless: true,
  },
});