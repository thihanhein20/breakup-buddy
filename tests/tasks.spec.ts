// tests/tasks.spec.ts
// Tests for the recovery tasks flow

import { test, expect } from "@playwright/test";

test.describe("Recovery Tasks", () => {
  test.beforeEach(async ({ page }) => {
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.log("BROWSER ERROR:", msg.text());
      }
    });
  });

  test("loads the tasks page with progress bar", async ({ page }) => {
    await page.goto("/tasks");

    await expect(
      page.getByRole("heading", { name: /Small steps, real healing/i }),
    ).toBeVisible();
    await expect(page.getByText(/tasks complete/i)).toBeVisible();
  });

  test("shows tasks grouped by day", async ({ page }) => {
    await page.goto("/tasks");

    await expect(page.getByText("Day 1")).toBeVisible();
    await expect(page.getByText("Day 2")).toBeVisible();
    await expect(page.getByText("Day 7")).toBeVisible();
  });

  test("expanding a task shows its description and complete button", async ({
    page,
  }) => {
    await page.goto("/tasks");

    // Click the first task to expand it
    await page.getByText("Leave your room").click();

    // Description should now be visible
    await expect(
      page.getByText(/remind your body the world still exists/i),
    ).toBeVisible();

    // Complete button should be visible
    await expect(
      page.getByRole("button", { name: /Mark as done/i }),
    ).toBeVisible();
  });

  test("completing a task updates progress", async ({ page }) => {
    await page.goto("/tasks");

    const initialProgress = await page
      .getByText(/of 21 tasks complete/i)
      .textContent();

    await page.getByText("Leave your room").click();
    await page.screenshot({ path: "test_imgs/debug-task-expanded.png" });

    await page.getByRole("button", { name: /Mark as done/i }).click();
    await page.waitForTimeout(1500);

    await page.screenshot({ path: "test_imgs/debug-task-after-complete.png" });

    const updatedProgress = await page
      .getByText(/of 21 tasks complete/i)
      .textContent();
    expect(updatedProgress).not.toBe(initialProgress);
  });
});
