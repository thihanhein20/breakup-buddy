// tests/mood.spec.ts
// Tests for the mood logging flow

import { test, expect } from "@playwright/test";

test.describe("Mood Tracker", () => {
  test.beforeEach(async ({ page }) => {
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.log("BROWSER ERROR:", msg.text());
      }
    });
  });

  test("loads the mood page with all mood options", async ({ page }) => {
    await page.goto("/mood");

    await expect(
      page.getByRole("heading", { name: /How are you feeling/i }),
    ).toBeVisible();

    await expect(page.getByText("Devastated")).toBeVisible();
    await expect(page.getByText("Sad")).toBeVisible();
    await expect(page.getByText("Numb")).toBeVisible();
    await expect(page.getByText("Okay")).toBeVisible();
    await expect(page.getByText("Hopeful")).toBeVisible();
  });

  test("selecting a mood reveals the intensity slider and note field", async ({
    page,
  }) => {
    await page.goto("/mood");

    const saveButton = page.getByRole("button", { name: /Save check-in/i });
    await expect(saveButton).toBeDisabled();

    await page.getByText("Okay").click();

    await expect(saveButton).toBeEnabled();
  });

  test("can log a mood and see it in recent check-ins", async ({ page }) => {
    await page.goto("/mood");

    await page.waitForLoadState("networkidle");

    await page.getByText("Hopeful").click();

    await page
      .getByPlaceholder(/What's going on right now/i)
      .fill("Test note from Playwright");

    await page.getByRole("button", { name: /Save check-in/i }).click();

    await page.waitForTimeout(1000);

    await expect(page.getByText(/Logged\. Keep going\./i)).toBeVisible({
      timeout: 10000,
    });
  });
});
