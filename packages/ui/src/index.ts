/**
 * @loki-sample/ui パッケージのエントリーポイント
 *
 * 共有 UI コンポーネントとその型定義を re-export する。
 * apps/web から import { Button } from "@loki-sample/ui" のように使用される。
 */

// Button コンポーネント: Primary / Secondary / Danger の3バリアント、3サイズ対応
export { Button } from "./components/Button";
export type { ButtonProps } from "./components/Button";

// Card コンポーネント: Default（シャドウ）/ Outlined（ボーダー）の2バリアント
export { Card } from "./components/Card";
export type { CardProps } from "./components/Card";

// Badge コンポーネント: Info / Success / Warning / Error の4バリアント
export { Badge } from "./components/Badge";
export type { BadgeProps } from "./components/Badge";
