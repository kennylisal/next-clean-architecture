import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "test/e2e/", // Folder for your tests
  fullyParallel: false, // Run serially to avoid Clerk token issues
  reporter: "html", // Generates reports
  use: {
    baseURL: "http://localhost:3000", // Your app's URL
    trace: "on-first-retry", // For debugging
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    // Add more browsers if needed
  ],
  globalSetup: "./test/e2e/global-setup.ts",
});
