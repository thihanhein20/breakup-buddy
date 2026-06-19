// tests/fixtures.ts
// Shared authenticated context to avoid hitting Supabase's anonymous auth rate limit

import { test as base } from "@playwright/test";

export const test = base.extend({
  // Reuse the same browser context (and thus the same anon session) across tests in a file
  storageState: async ({ page }, use) => {
    await page.goto("/");
    await page.waitForTimeout(1500); // let anon sign-in complete
    const state = await page.context().storageState();
    await use(state as any);
  },
});

export { expect } from "@playwright/test";
