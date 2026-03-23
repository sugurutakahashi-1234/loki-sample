import { beforeAll } from "vitest";

// CSF Factories ではプレビュー設定から composed.beforeAll を参照する。
// https://storybook.js.org/docs/api/csf/csf-next#upgrade-to-csf-next
import preview from "#.storybook/preview";

beforeAll(preview.composed.beforeAll);
