/**
 * カラーパレットの Storybook ストーリー定義
 *
 * セマンティックカラートークン一覧を表示するドキュメントページ。
 * addon-themes でテーマを切り替えると Light / Dark の値がリアルタイムで確認できる。
 */
import preview from "#.storybook/preview";

import { ColorPalette } from "./ColorPalette";

const meta = preview.meta({
  title: "Foundations/Color Palette",
  component: ColorPalette,
});

export const Default = meta.story();
