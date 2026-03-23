import { fn } from "storybook/test";

import preview from "#.storybook/preview";

import { ErrorBanner } from "./ErrorBanner";

const meta = preview.meta({
  title: "Components/ErrorBanner",
  component: ErrorBanner,
});

/** メッセージのみ */
export const Default = meta.story({
  args: {
    message: "Something went wrong.",
  },
});

/** Retry ボタン付き */
export const WithRetry = meta.story({
  args: {
    message: "Failed to load data.",
    onRetry: fn(),
  },
});
