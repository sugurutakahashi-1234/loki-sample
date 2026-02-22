/**
 * Button コンポーネントの VRT（ビジュアルリグレッションテスト）
 *
 * Storybook の各ストーリーに対してスクリーンショットを撮影し、
 * リファレンス画像（vrt/screenshots/）と比較する。
 * URL の id パラメータは Storybook のストーリー ID に対応する。
 */
import { expect, test } from "@playwright/test";

test.describe("Button", () => {
  test("Primary", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=components-button--primary&viewMode=story"
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });

  test("Secondary", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=components-button--secondary&viewMode=story"
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });

  test("Danger", async ({ page }) => {
    await page.goto("/iframe.html?id=components-button--danger&viewMode=story");
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });

  test("Small", async ({ page }) => {
    await page.goto("/iframe.html?id=components-button--small&viewMode=story");
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });

  test("Large", async ({ page }) => {
    await page.goto("/iframe.html?id=components-button--large&viewMode=story");
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });

  test("Disabled", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=components-button--disabled&viewMode=story"
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });
});
