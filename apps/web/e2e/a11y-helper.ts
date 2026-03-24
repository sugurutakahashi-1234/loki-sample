/**
 * E2E a11y テスト用ヘルパー
 *
 * axe-core の設定を統一し、各テストファイルで共通の a11y チェックを提供する。
 *
 * 無効化しているルール:
 * - region: header（ThemeToggle）や MSW バナーがランドマーク外にあるため。
 *   Storybook a11y でも同ルールを無効化しており、一貫性を保つ。
 */
import { AxeBuilder } from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import type { AxeResults } from "axe-core";

export const analyzeA11y = (page: Page): Promise<AxeResults> =>
  new AxeBuilder({ page }).disableRules(["region"]).analyze();
