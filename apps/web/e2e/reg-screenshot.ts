/**
 * スクリーンショットユーティリティ
 *
 * スクリーンショットを2箇所に保存する:
 * - e2e/screenshots/ : git 管理用（変更履歴を追跡）
 * - .reg/actual/     : reg-cli 比較用（CI でベースラインとの差分検出）
 *
 * テストファイル名・スクリーンショット名は test.info() から自動生成する。
 * theme オプションでダークモードのスクリーンショットも撮影可能。
 */
import { mkdirSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import type { Locator, Page } from "@playwright/test";
import { test } from "@playwright/test";

async function takeScreenshot(
  target: Page | Locator,
  options?: { fullPage?: boolean; theme?: "light" | "dark" }
) {
  const theme = options?.theme ?? "light";
  const info = test.info();

  // ダークモード適用: <html> に dark クラスを付与
  if (theme === "dark") {
    const page = "page" in target ? target.page() : target;
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
    });
  }

  // テストタイトルからスクリーンショット名を自動生成（テーマサフィックス付き）
  const name = `${info.titlePath
    .slice(1)
    .join("-")
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")}-${theme}.png`;

  const testFile = basename(info.file);

  // git 管理用: e2e/screenshots/ に保存（Mac のみ・変更履歴を追跡）
  if (process.platform === "darwin") {
    const screenshotPath = join("e2e", "screenshots", testFile, name);
    mkdirSync(dirname(screenshotPath), { recursive: true });
    await target.screenshot({ path: screenshotPath, ...options });
  }

  // reg-cli 用: .reg/actual/ に保存（常に実行・CI での差分比較に使用）
  const regPath = join(".reg", "actual", testFile, name);
  mkdirSync(dirname(regPath), { recursive: true });
  await target.screenshot({ path: regPath, ...options });

  // ダークモードのクリーンアップ: 次のスクリーンショットに影響しないように dark クラスを除去
  if (theme === "dark") {
    const page = "page" in target ? target.page() : target;
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
    });
  }
}

/**
 * ライト・ダーク両テーマのスクリーンショットを一度に撮影する。
 * 呼び出し側で2回 takeScreenshot を書く必要がなくなる。
 */
export async function takeThemeScreenshots(
  target: Page | Locator,
  options?: { fullPage?: boolean }
) {
  await takeScreenshot(target, { ...options, theme: "light" });
  await takeScreenshot(target, { ...options, theme: "dark" });
}
