import { expect, userEvent, within } from "storybook/test";

/**
 * ThemeToggle コンポーネントの Storybook ストーリー定義
 *
 * テーマ切り替えボタンの2状態（Light / Dark）の表示と
 * クリックによるトグル動作を確認するストーリーを定義する。
 */
import preview from "#.storybook/preview";

import { ThemeToggle } from "./ThemeToggle";

const meta = preview.meta({
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <div className="flex items-center gap-4 p-4">
        <Story />
        <span className="text-on-surface-muted text-sm">
          クリックでテーマを切り替え
        </span>
      </div>
    ),
  ],
});

/** デフォルト状態 */
export const Default = meta.story();

/** クリックでテーマがトグルすることを検証 */
export const CycleThemes = meta.story({
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // ThemeToggle は useEffect でマウント完了するまでプレースホルダーを表示するため、
    // ボタンが出現するまで待機する
    const [button] = (await canvas.findAllByRole("button")) as [HTMLElement];
    const initialLabel = button.getAttribute("aria-label") || "";
    const startsLight = /ライト/.test(initialLabel);

    // 1回クリック: light → dark または dark → light
    await userEvent.click(button);
    const expectedAfterFirst = startsLight ? /ダーク/ : /ライト/;
    await expect(button).toHaveAccessibleName(expectedAfterFirst);

    // 2回クリック: 元に戻る
    await userEvent.click(button);
    const expectedAfterSecond = startsLight ? /ライト/ : /ダーク/;
    await expect(button).toHaveAccessibleName(expectedAfterSecond);
  },
});
