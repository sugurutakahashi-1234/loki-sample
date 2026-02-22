/**
 * Badge コンポーネントの Storybook ストーリー定義
 *
 * 各バリアント（Info / Success / Warning / Error）のストーリーを定義する。
 * VRT テスト（vrt/badge.spec.ts）でスクリーンショット比較の対象となる。
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  // Storybook のサイドバーでの表示パス
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Info バリアント（青系） */
export const Info: Story = {
  args: {
    children: "Info",
    variant: "info",
  },
};

/** Success バリアント（緑系） */
export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
  },
};

/** Warning バリアント（黄系） */
export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
  },
};

/** Error バリアント（赤系） */
export const ErrorVariant: Story = {
  name: "Error",
  args: {
    children: "Error",
    variant: "error",
  },
};
