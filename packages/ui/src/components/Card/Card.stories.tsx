/**
 * Card コンポーネントの Storybook ストーリー定義
 *
 * 各バリアント（Default / Outlined）とヘッダーなしパターンのストーリーを定義する。
 * VRT テスト（vrt/card.spec.ts）でスクリーンショット比較の対象となる。
 */
import preview from "#.storybook/preview";

import { Card } from "./Card";

const meta = preview.meta({
  // Storybook のサイドバーでの表示パス
  title: "Components/Card",
  component: Card,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outlined"],
    },
  },
});

/** Default バリアント（シャドウ付き） */
export const Default = meta.story({
  args: {
    header: "Card Title",
    children: "This is the card body content. You can put any content here.",
  },
});

/** Outlined バリアント（ボーダー付き） */
export const Outlined = meta.story({
  args: {
    variant: "outlined",
    header: "Outlined Card",
    children: "This card has an outlined style instead of a shadow.",
  },
});

/** ヘッダーなし */
export const WithoutHeader = meta.story({
  args: {
    children: "This card has no header, just body content.",
  },
});
