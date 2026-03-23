import { expect, fn, userEvent, within } from "storybook/test";

/**
 * Button コンポーネントの Storybook ストーリー定義
 *
 * 各バリアント（Primary / Secondary / Danger）、サイズ（Small / Large）、
 * 状態（Disabled）のストーリーを定義する。
 * VRT テスト（vrt/button.spec.ts）でスクリーンショット比較の対象となる。
 */
import preview from "#.storybook/preview";

import { Button } from "./Button";

const meta = preview.meta({
  // Storybook のサイドバーでの表示パス
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
});

/** Primary バリアント（デフォルト） */
export const Primary = meta.story({
  args: {
    children: "Primary Button",
    variant: "primary",
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    // Side by side モードでは Light/Dark 両方にボタンが存在するため getAllByRole を使用
    const [button] = canvas.getAllByRole("button") as [HTMLElement];

    // クリック → onClick が呼び出されることを検証
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
});

/** Secondary バリアント */
export const Secondary = meta.story({
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
});

/** Danger バリアント */
export const Danger = meta.story({
  args: {
    children: "Danger Button",
    variant: "danger",
  },
});

/** Small サイズ */
export const Small = meta.story({
  args: {
    children: "Small Button",
    size: "sm",
  },
});

/** Large サイズ */
export const Large = meta.story({
  args: {
    children: "Large Button",
    size: "lg",
  },
});

/** 無効化状態 */
export const Disabled = meta.story({
  args: {
    children: "Disabled Button",
    disabled: true,
  },
});
