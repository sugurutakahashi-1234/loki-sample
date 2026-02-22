# Playwright VRT + Storybook Sample

Playwright を使ったビジュアルリグレッションテスト（VRT）と E2E テストのサンプルプロジェクトです。

## 技術スタック

| 技術 | 用途 |
|------|------|
| Next.js 16 | アプリケーション |
| Storybook 10 | コンポーネントカタログ |
| Playwright | VRT + E2E テスト |
| Tailwind CSS v4 | スタイリング |
| Ultracite (Biome) | リンター + フォーマッター |
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

### リント & フォーマット

```bash
# リント + フォーマットチェック（CI 用）
bun run lint

# リント + フォーマット自動修正（ローカル開発用）
bun run lint:fix
```

## テスト

### Storybook VRT（ビジュアルリグレッションテスト）

コンポーネントの見た目が意図せず変わっていないかをスクリーンショット比較で検証します。

```bash
# VRT テスト実行（Storybook ビルド + スクリーンショット比較）
bun run storybook:vrt
```

### E2E テスト

Next.js アプリに対するシナリオベースのテスト + ページ全体のスクリーンショット比較です。

```bash
# E2E テスト実行（Next.js dev サーバーが自動起動）
bun run web:e2e
```

### スナップショット更新

スナップショット（リファレンス画像）は OS ごとに分離管理されています（`darwin/` と `linux/`）。
`update-snapshots` コマンドを使うと、ローカル（macOS）と Docker（Linux/CI 用）の両方を一括更新できます。

更新時は該当プラットフォームのスクリーンショットディレクトリを事前削除してから再生成するため、ストーリーの削除やリネーム後に古いファイルが残ることはありません。

```bash
# 全部まとめて更新（VRT + E2E、ローカル + Docker）
bun run update-snapshots

# VRT のみ更新（ローカル + Docker）
bun run storybook:vrt:update-snapshots

# E2E のみ更新（ローカル + Docker）
bun run web:e2e:update-snapshots
```

個別のプラットフォームだけ更新したい場合:

```bash
# VRT: ローカル（darwin）のみ / Docker（linux）のみ
bun run storybook:vrt:update-snapshots:local
bun run storybook:vrt:update-snapshots:docker

# E2E: ローカル（darwin）のみ / Docker（linux）のみ
bun run web:e2e:update-snapshots:local
bun run web:e2e:update-snapshots:docker
```

### VRT ワークフロー

1. `bun run storybook:vrt` でテスト実行 → 全テストパス
2. コンポーネントのスタイルを変更
3. `bun run storybook:vrt` で再テスト → 差分検出で失敗
4. 変更が意図通りなら `bun run update-snapshots` でリファレンス画像を再生成
5. リファレンス画像をコミット

## Git Hooks（Lefthook）

| フック | ジョブ | 内容 |
|-------|--------|------|
| pre-commit | lint-fix | Biome によるリント + フォーマット自動修正 |
| pre-commit | conflict-markers | コンフリクトマーカーの残存チェック |
| pre-commit | no-secrets | .env ファイルの誤コミット防止 |
| pre-push | lint-check | Biome リント + フォーマットチェック（CI 同等） |
| pre-push | typecheck | TypeScript 型チェック |
| pre-push | build | Next.js ビルド |
| pre-push | playwright-version-check | Playwright バージョン整合性チェック |
| pre-push | bun-version-check | bun バージョン整合性チェック |
| pre-push | storybook-vrt | Storybook VRT（コンポーネントのスクリーンショット比較） |
| pre-push | web-e2e | Web E2E テスト（ページ全体のスクリーンショット比較 + シナリオテスト） |

## CI/CD

PR 作成時に GitHub Actions が自動実行されます。

- **Lint & Format** (`lint.yml`): 全 PR で Biome によるリント + フォーマットチェック
- **Storybook VRT** (`vrt.yml`): `packages/ui/` の変更時に実行
- **E2E テスト** (`e2e.yml`): `apps/web/` または `packages/ui/` の変更時に実行

失敗時はテスト結果と差分レポートがアーティファクトとしてダウンロードできます。
