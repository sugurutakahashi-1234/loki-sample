import { describe, expect, test } from "bun:test";
import { formatCount } from "./format-count";

describe("formatCount", () => {
  test("0 の場合は空文字を返す", () => {
    expect(formatCount(0)).toBe("");
  });

  test("正の数はそのまま文字列で返す", () => {
    expect(formatCount(1)).toBe("1");
  });

  test("境界値: max と同じ値はそのまま返す", () => {
    expect(formatCount(99)).toBe("99");
  });

  test("上限超過時は max+ を返す", () => {
    expect(formatCount(100)).toBe("99+");
  });

  test("負数の場合は空文字を返す", () => {
    expect(formatCount(-1)).toBe("");
  });

  test("max をカスタマイズできる", () => {
    expect(formatCount(1000, 999)).toBe("999+");
  });
});
