/**
 * タイポグラフィの Storybook ストーリー定義
 *
 * 利用可能なフォントファミリー・サイズ・ウェイトの一覧を表示するドキュメントページ。
 * addon-themes でテーマを切り替えると Light / Dark の値がリアルタイムで確認できる。
 */
import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./Typography";

const meta = {
  title: "Foundations/Typography",
  component: Typography,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
