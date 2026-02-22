/**
 * Card コンポーネントの VRT（ビジュアルリグレッションテスト）
 *
 * Storybook の各ストーリーに対してスクリーンショットを撮影し、
 * リファレンス画像（vrt/screenshots/）と比較する。
 */
import { expect, test } from "@playwright/test";

test.describe("Card", () => {
  test("Default", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=components-card--default&viewMode=story"
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });

  test("Outlined", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=components-card--outlined&viewMode=story"
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });

  test("Without Header", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=components-card--without-header&viewMode=story"
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });
});
