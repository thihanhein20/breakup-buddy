// tests/navigation.spec.ts
// Tests for sidebar navigation across all pages

import { test, expect } from "@playwright/test";

const routes = [
  { path: "/dashboard", heading: /You showed up/i },
  { path: "/mood", heading: /How are you feeling/i },
  { path: "/journal", heading: /Write it out/i },
  { path: "/tasks", heading: /Small steps, real healing/i },
  { path: "/progress", heading: /See how far you've come/i },
  { path: "/affirmations", heading: /Words for you/i },
];

test.describe("Navigation", () => {
  for (const route of routes) {
    test(`${route.path} loads correctly`, async ({ page }) => {
      await page.goto(route.path);
      await expect(
        page.getByRole("heading", { name: route.heading }),
      ).toBeVisible();
    });
  }

  test("sidebar links navigate to the correct pages", async ({ page }) => {
    await page.goto("/dashboard");

    const sidebar = page.locator("aside").first();

    await sidebar.getByRole("link", { name: "Mood" }).click();
    await expect(page).toHaveURL(/\/mood/);

    await sidebar.getByRole("link", { name: "Journal" }).click();
    await expect(page).toHaveURL(/\/journal/);

    await sidebar.getByRole("link", { name: "Tasks" }).click();
    await expect(page).toHaveURL(/\/tasks/);

    await sidebar.getByRole("link", { name: "Progress" }).click();
    await expect(page).toHaveURL(/\/progress/);

    await sidebar.getByRole("link", { name: "Affirmations" }).click();
    await expect(page).toHaveURL(/\/affirmations/);

    await sidebar.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("sidebar is visible on dashboard but not on landing page", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("BreakUp Buddy").first()).toBeVisible();

    const sidebarOnLanding = page.locator("aside").first();
    await expect(sidebarOnLanding).not.toBeVisible();

    await page.goto("/dashboard");
    const sidebar = page.locator("aside").first();
    await expect(sidebar.getByRole("link", { name: "Mood" })).toBeVisible();
  });
});
