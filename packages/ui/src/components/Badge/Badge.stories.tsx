import { expect, within } from "storybook/test";

/**
 * Badge コンポーネントの Storybook ストーリー定義
 *
 * 各バリアント（Info / Success / Warning / Error）のストーリーを定義する。
 * VRT テスト（vrt/badge.spec.ts）でスクリーンショット比較の対象となる。
 */
import preview from "#.storybook/preview";

import { Badge } from "./Badge";

const meta = preview.meta({
  // Storybook のサイドバーでの表示パス
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
});

/** Info バリアント（青系） */
export const Info = meta.story({
  args: {
    children: "Info",
    variant: "info",
  },
});

/** Success バリアント（緑系） */
export const Success = meta.story({
  args: {
    children: "Success",
    variant: "success",
  },
});

/** Warning バリアント（黄系） */
export const Warning = meta.story({
  args: {
    children: "Warning",
    variant: "warning",
  },
});

/** Error バリアント（赤系） */
export const ErrorVariant = meta.story({
  name: "Error",
  args: {
    children: "Error",
    variant: "error",
  },
});

/** 件数表示（上限以内） */
export const WithCount = meta.story({
  args: {
    count: 5,
    variant: "info",
  },
});

/** 件数表示（上限超過 → "99+" 表示） */
export const WithCountOverflow = meta.story({
  args: {
    count: 150,
    variant: "error",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText("99+")[0]).toBeVisible();
  },
});

/** 件数表示（負数 → 何も表示されない） */
export const WithNegativeCount = meta.story({
  args: {
    count: -1,
    children: "Fallback",
    variant: "info",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 負数の場合は formatCount が空文字を返すため、children の "Fallback" が表示される
    await expect(canvas.getAllByText("Fallback")[0]).toBeVisible();
  },
});
