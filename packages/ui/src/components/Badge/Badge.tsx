import type { HTMLAttributes } from "react";

/** Badge コンポーネントの Props */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** バッジのスタイルバリアント（デフォルト: info） */
  variant?: "info" | "success" | "warning" | "error";
}

/** バリアントごとの Tailwind CSS クラス定義 */
const variantStyles: Record<string, string> = {
  info: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};

/**
 * バッジコンポーネント
 *
 * ステータスやラベルをインラインで表示するための小さなタグ。
 * info / success / warning / error の4バリアントを提供する。
 */
export function Badge({
  variant = "info",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
