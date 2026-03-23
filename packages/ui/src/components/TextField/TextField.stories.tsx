import { expect, userEvent, within } from "storybook/test";

/**
 * TextField コンポーネントの Storybook ストーリー定義
 *
 * 各状態（Default / WithLabel / WithError / WithHelperText / Disabled）のストーリーを定義する。
 * play 関数によるインタラクションテストを含む。
 */
import preview from "#.storybook/preview";

import { TextField } from "./TextField";

const meta = preview.meta({
  title: "Components/TextField",
  component: TextField,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outlined"],
    },
  },
});

/** デフォルト状態 */
export const Default = meta.story({
  args: {
    placeholder: "Enter text...",
  },
});

/** テキスト入力テスト */
export const Typing = meta.story({
  args: {
    placeholder: "Enter text...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Side by side モードでは Light/Dark 両方に入力欄が存在するため getAllByRole を使用
    const [input] = canvas.getAllByRole("textbox") as [HTMLElement];

    // テキストを入力し、値が反映されることを検証
    await userEvent.type(input, "Hello, World!");
    await expect(input).toHaveValue("Hello, World!");
  },
});

/** ラベル付き */
export const WithLabel = meta.story({
  args: {
    label: "Username",
    placeholder: "Enter username...",
  },
});

/** エラー状態 */
export const WithError = meta.story({
  args: {
    label: "Email",
    error: "Invalid email address",
    defaultValue: "invalid-email",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // エラーメッセージが表示されていることを検証
    const [errorMessage] = canvas.getAllByRole("alert") as [HTMLElement];
    await expect(errorMessage).toHaveTextContent("Invalid email address");

    // input に aria-invalid が設定されていることを検証
    const [input] = canvas.getAllByRole("textbox") as [HTMLElement];
    await expect(input).toHaveAttribute("aria-invalid", "true");
  },
});

/** ヘルパーテキスト付き */
export const WithHelperText = meta.story({
  args: {
    label: "Password",
    helperText: "Must be at least 8 characters",
    type: "password",
  },
});

/** 無効化状態 */
export const Disabled = meta.story({
  args: {
    label: "Disabled Field",
    placeholder: "Cannot type here",
    disabled: true,
  },
});
