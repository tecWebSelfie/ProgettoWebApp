import { test, expect } from "../fixtures/mainfixture";

/**
 * This is a test file for accessibility testing using the axe-core library.
 */
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("playwright is working", async ({ page }) => {
  await expect(page).toHaveTitle(/Create Next App/);
});

test("Testing accessibility", async ({ a11y }) => {
  const a11yScan = await a11y().analyze();
  expect(a11yScan.violations).toHaveLength(0);
});
