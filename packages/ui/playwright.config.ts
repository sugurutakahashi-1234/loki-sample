/**
 * Storybook VRT（ビジュアルリグレッションテスト）用 Playwright 設定
 *
 * Storybook で描画されたコンポーネントのスクリーンショットを撮影し、
 * リファレンス画像と比較することで意図しない見た目の変更を検出する。
 *
 * 実行: bun run storybook:vrt
 * リファレンス画像更新: bun run storybook:vrt:update-snapshots:local
 */
import { defineConfig } from "@playwright/test";

export default defineConfig({
  // テストファイルの配置ディレクトリ
  testDir: "./vrt",

  // リファレンス画像（スナップショット）の保存先ディレクトリ
  snapshotDir: "./vrt/screenshots",

  // スナップショットのファイルパステンプレート
  // 例: vrt/screenshots/darwin/Components/Button/Primary.png
  snapshotPathTemplate: "{snapshotDir}/{platform}/{arg}{ext}",

  // テストを並列実行する（独立したコンポーネントのスクリーンショットなので並列で問題ない）
  fullyParallel: true,

  // CI 環境では .only の使用を禁止（テストの実行漏れを防止）
  forbidOnly: !!process.env.CI,

  // CI 環境ではフレーキーテスト対策として最大2回リトライ、ローカルではリトライしない
  retries: process.env.CI ? 2 : 0,

  // CI 環境ではスクリーンショットの一貫性のため1ワーカーに制限、ローカルはCPUに合わせて自動
  workers: process.env.CI ? 1 : undefined,

  // テスト結果を HTML レポートとして出力（playwright-report/ に生成）
  reporter: "html",

  use: {
    // Storybook の URL
    baseURL: "http://localhost:6006",

    // テスト失敗時の自動スクリーンショットは無効（VRT 自体がスクリーンショット比較のため不要）
    screenshot: "off",
  },

  expect: {
    toHaveScreenshot: {
      // ピクセル差分の許容率（1%）
      // アンチエイリアシングやフォントレンダリングの微差を吸収するための閾値
      maxDiffPixelRatio: 0.01,
    },
  },

  // ビルド済み Storybook を http-server で配信（index.json の読み取りにビルドが必要）
  webServer: {
    command: "bunx http-server storybook-static --port 6006 --silent",
    url: "http://localhost:6006",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
