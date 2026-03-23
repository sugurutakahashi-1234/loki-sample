import preview from "#.storybook/preview";
import Home from "@/page";

import { pageStoryMeta } from "./page-story-config";

const meta = preview.meta({
  ...pageStoryMeta,
  title: "Pages/Home",
  component: Home,
});

/** デフォルト表示 */
export const Default = meta.story();
