// tests/global-setup.ts
// Creates ONE anonymous Supabase session and reuses it for all tests

import { chromium, type FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(config.projects[0].use.baseURL || "http://localhost:3000");
  await page.waitForTimeout(2000); // let anonymous sign-in complete

  await page.context().storageState({ path: "tests/.auth/user.json" });
  await browser.close();
}

export default globalSetup;
