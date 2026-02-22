# Playwright VRT + Storybook Sample

Playwright を使ったビジュアルリグレッションテスト（VRT）と E2E テストのサンプルプロジェクトです。

## 技術スタック

| 技術 | 用途 |
|------|------|
| Next.js 16 | アプリケーション |
| Storybook 10 | コンポーネントカタログ |
| Playwright | VRT + E2E テスト |
| Tailwind CSS v4 | スタイリング |
| bun | パッケージマネージャー + モノレポ管理 |
| TypeScript | 型安全性 |

## プロジェクト構成

```
loki-sample/
├── apps/
│   └── web/                  # Next.js アプリ + E2E テスト
├── packages/
│   └── ui/                   # 共有 UI コンポーネント + Storybook + VRT
└── .github/workflows/        # CI (VRT + E2E)
```

## セットアップ

```bash
# 依存関係インストール
bun install

# Playwright ブラウザインストール
cd packages/ui && bunx playwright install --with-deps && cd ../..
cd apps/web && bunx playwright install --with-deps && cd ../..
```

## 開発ワークフロー

### Storybook 開発

```bash
# Storybook 起動 (http://localhost:6006)
bun run storybook
```

### Next.js アプリ開発

```bash
# Next.js dev サーバー起動 (http://localhost:3000)
bun run dev
```

## テスト

### Storybook VRT（ビジュアルリグレッションテスト）

コンポーネントの見た目が意図せず変わっていないかをスクリーンショット比較で検証します。

```bash
# VRT 実行（Storybook が自動起動）
bun run vrt

# リファレンス画像を更新
bun run vrt:update
```

### E2E テスト

Next.js アプリに対するシナリオベースのテストです。

```bash
# E2E テスト実行（Next.js dev サーバーが自動起動）
bun run e2e

# リファレンス画像を更新
bun run e2e:update
```

## VRT ワークフロー

1. `bun run vrt` でテスト実行 → 全テストパス
2. コンポーネントのスタイルを変更
3. `bun run vrt` で再テスト → 差分検出で失敗
4. 変更が意図通りなら `bun run vrt:update` で新しいリファレンス画像を承認
5. リファレンス画像をコミット

## CI/CD

PR 作成時に GitHub Actions が自動実行されます。

- **Storybook VRT** (`vrt.yml`): `packages/ui/` の変更時に実行
- **E2E テスト** (`e2e.yml`): `apps/web/` または `packages/ui/` の変更時に実行

失敗時はテスト結果と差分レポートがアーティファクトとしてダウンロードできます。
