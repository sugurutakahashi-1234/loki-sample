/**
 * カラーパレットの Storybook ストーリー定義
 *
 * セマンティックカラートークン一覧を表示するドキュメントページ。
 * addon-themes でテーマを切り替えると Light / Dark の値がリアルタイムで確認できる。
 */
import type { Meta, StoryObj } from "@storybook/react";

import { ColorPalette } from "./ColorPalette";

const meta = {
  title: "Foundations/Color Palette",
  component: ColorPalette,
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
