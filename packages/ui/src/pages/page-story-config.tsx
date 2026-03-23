/**
 * ページストーリー用の共通設定。
 *
 * ページストーリーの meta に展開して使う:
 *   const meta = preview.meta({ ...pageStoryMeta, component: Home });
 *
 * a11y の責務分担:
 * - Storybook a11y: コンポーネントレベル（コントラスト、aria-label 等）
 * - Playwright a11y: ページレベル（ランドマーク構造、見出し階層等）← 今後追加予定
 *
 * Side by side モードで <main>/<nav> が重複するため landmark 系ルールは Storybook 側で無効化し、
 * ページレベルの a11y は Playwright で担保する方針。
 */
import { Description, Primary, Title } from "@storybook/addon-docs/blocks";

const PageDocsPage = () => (
  <>
    <Title />
    <Description />
    <Primary />
  </>
);

/** ページストーリーの共通 meta 設定。preview.meta() に展開して使う */
export const pageStoryMeta = {
  parameters: {
    layout: "fullscreen" as const,
    docs: { page: PageDocsPage },
    // Side by side モードで <main>/<nav> が重複するため landmark 系ルールを無効化。
    // ページレベルの a11y は Playwright で担保する。
    a11y: {
      config: {
        rules: [
          { id: "landmark-no-duplicate-main", enabled: false },
          { id: "landmark-unique", enabled: false },
        ],
      },
    },
  },
};
