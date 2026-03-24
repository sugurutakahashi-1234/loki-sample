/**
 * Todos ページの E2E テスト
 *
 * Staging API に実際に疎通して、Todo の CRUD フロー全体を検証する。
 * API 結合テスト（createRouterClient）では担保できない以下をカバー:
 * - フロントエンド → Staging API のネットワーク疎通
 * - Hono 層（ルーティング、CORS、OpenAPIHandler）
 * - ブラウザでの実際のユーザー操作フロー
 *
 * テストデータ: ユニークなプレフィックス `[E2E]` 付きで作成。Staging DB に残るが使い捨て前提。
 *
 * 実行:
 *   NEXT_PUBLIC_API_BASE_URL=https://storybook-vrt-sample-api-staging.samonikura100.workers.dev/api \
 *     bun run web:e2e:playwright
 */
import { expect, test } from "@playwright/test";

import { analyzeA11y } from "./a11y-helper";

const uniqueTitle = () => `[E2E] ${crypto.randomUUID().slice(0, 8)}`;

test.describe("Todos Page", () => {
  test("ページが正しく表示される", async ({ page }) => {
    await page.goto("/todos");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Todos");
    await expect(page.getByText("Todo List")).toBeVisible();
  });

  test("Todo を作成して一覧に表示される", async ({ page }) => {
    await page.goto("/todos");
    await expect(page.getByText("Todo List")).toBeVisible();

    const title = uniqueTitle();
    await page.getByLabel("New todo title").fill(title);
    await page.getByRole("button", { name: "Add" }).click();

    await expect(page.getByText(title)).toBeVisible();
  });

  test("Todo の完了状態をトグルできる", async ({ page }) => {
    await page.goto("/todos");
    await expect(page.getByText("Todo List")).toBeVisible();

    const title = uniqueTitle();
    await page.getByLabel("New todo title").fill(title);
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText(title)).toBeVisible();

    const checkbox = page.getByRole("checkbox", { name: title });
    await expect(checkbox).not.toBeChecked();

    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test("Enter キーで Todo を作成できる", async ({ page }) => {
    await page.goto("/todos");
    await expect(page.getByText("Todo List")).toBeVisible();

    const title = uniqueTitle();
    await page.getByLabel("New todo title").fill(title);
    await page.getByLabel("New todo title").press("Enter");

    await expect(page.getByText(title)).toBeVisible();
  });

  test("アクセシビリティ違反がない（Light）", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/todos");
    await expect(page.getByText("Todo List")).toBeVisible();
    const results = await analyzeA11y(page);
    expect(results.violations).toEqual([]);
  });

  test("アクセシビリティ違反がない（Dark）", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/todos");
    await expect(page.getByText("Todo List")).toBeVisible();
    const results = await analyzeA11y(page);
    expect(results.violations).toEqual([]);
  });
});
