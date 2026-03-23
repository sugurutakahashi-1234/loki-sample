/**
 * タイポグラフィの Storybook ストーリー定義
 *
 * 利用可能なフォントファミリー・サイズ・ウェイトの一覧を表示するドキュメントページ。
 * addon-themes でテーマを切り替えると Light / Dark の値がリアルタイムで確認できる。
 */
import preview from "#.storybook/preview";

import { Typography } from "./Typography";

const meta = preview.meta({
  title: "Foundations/Typography",
  component: Typography,
  parameters: {
    layout: "fullscreen",
  },
});

export const Default = meta.story();
