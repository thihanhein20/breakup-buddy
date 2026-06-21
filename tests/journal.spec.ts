// tests/journal.spec.ts
// Tests for the guided journal flow

import { test, expect } from "@playwright/test";

test.describe("Guided Journal", () => {
  test.beforeEach(async ({ page }) => {
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.log("BROWSER ERROR:", msg.text());
      }
    });
  });

  test("loads the journal page with a prompt", async ({ page }) => {
    await page.goto("/journal");

    await expect(
      page.getByRole("heading", { name: /Write it out/i }),
    ).toBeVisible();
    await expect(page.getByText(/Today's prompt/i)).toBeVisible();
  });

  test("save button is disabled until 20 characters are written", async ({
    page,
  }) => {
    await page.goto("/journal");

    const textarea = page.getByPlaceholder(/Start writing/i);
    const saveButton = page.getByRole("button", {
      name: /Save \+ get Heart to Heart/i,
    });

    // Initially disabled
    await expect(saveButton).toBeDisabled();

    // Write less than 20 characters
    await textarea.fill("too short");
    await expect(saveButton).toBeDisabled();

    // Write 20+ characters
    await textarea.fill(
      "This is a long enough journal entry to unlock the button.",
    );
    await expect(saveButton).toBeEnabled();
  });

  test("shows word count as user types", async ({ page }) => {
    await page.goto("/journal");

    const textarea = page.getByPlaceholder(/Start writing/i);
    await textarea.fill("one two three four five");

    // Trigger an input event explicitly for webkit, then assert
    await textarea.dispatchEvent("input");

    // Use a more flexible matcher that waits for the count to settle
    await expect(page.getByText(/5 words/i)).toBeVisible({ timeout: 10000 });
  });
});
