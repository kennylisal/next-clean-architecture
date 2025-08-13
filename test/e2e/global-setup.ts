// test/e2e/global-setup.ts
import { clerkSetup } from "@clerk/testing/playwright";

export default async function globalSetup() {
  await clerkSetup();
}
