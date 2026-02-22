/**
 * Badge コンポーネントの VRT（ビジュアルリグレッションテスト）
 *
 * Storybook の各ストーリーに対してスクリーンショットを撮影し、
 * リファレンス画像（vrt/screenshots/）と比較する。
 */
import { expect, test } from "@playwright/test";

test.describe("Badge", () => {
  test("Info", async ({ page }) => {
    await page.goto("/iframe.html?id=components-badge--info&viewMode=story");
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });

  test("Success", async ({ page }) => {
    await page.goto("/iframe.html?id=components-badge--success&viewMode=story");
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });

  test("Warning", async ({ page }) => {
    await page.goto("/iframe.html?id=components-badge--warning&viewMode=story");
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });

  test("Error", async ({ page }) => {
    await page.goto("/iframe.html?id=components-badge--error&viewMode=story");
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });
});
