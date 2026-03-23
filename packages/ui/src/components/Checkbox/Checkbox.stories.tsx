import { expect, fn, userEvent, within } from "storybook/test";

/**
 * Checkbox コンポーネントの Storybook ストーリー定義
 *
 * ラベルの有無、チェック状態、無効化状態のストーリーを定義する。
 */
import preview from "#.storybook/preview";

import { Checkbox } from "./Checkbox";

const meta = preview.meta({
  title: "Components/Checkbox",
  component: Checkbox,
});

/** デフォルト: ラベル付き未チェック */
export const Default = meta.story({
  args: {
    label: "Accept terms and conditions",
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const [checkbox] = canvas.getAllByRole("checkbox") as [HTMLElement];

    await userEvent.click(checkbox);
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  },
});

/** チェック済み */
export const Checked = meta.story({
  args: {
    label: "Completed task",
    checked: true,
    readOnly: true,
  },
});

/** ラベルなし */
export const WithoutLabel = meta.story({
  args: {
    "aria-label": "Toggle option",
  },
});

/** 無効化状態 */
export const Disabled = meta.story({
  args: {
    label: "Unavailable option",
    disabled: true,
  },
});

/** 無効化 + チェック済み */
export const DisabledChecked = meta.story({
  args: {
    label: "Locked option",
    disabled: true,
    checked: true,
    readOnly: true,
  },
});
