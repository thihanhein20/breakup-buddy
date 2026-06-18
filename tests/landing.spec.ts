// tests/landing.spec.ts
// Tests for the BreakUp Buddy landing page

import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("loads and shows the headline", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /No judgment/i }),
    ).toBeVisible();
  });

  test("shows the SDG 3 badge", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText(/SDG 3 · Good Health/i)).toBeVisible();
  });

  test('clicking "I need this right now" navigates to dashboard', async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /I need this right now/i }).click();

    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("has no sidebar on the landing page", async ({ page }) => {
    await page.goto("/");

    // The actual sidebar nav link text is "Mood", not "Mood Tracker"
    await expect(page.getByRole("link", { name: "Mood" })).not.toBeVisible();
  });
});
