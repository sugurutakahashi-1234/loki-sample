import type { HTMLAttributes, ReactNode } from "react";

/** Card コンポーネントの Props */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** カードのスタイルバリアント（デフォルト: default） */
  variant?: "default" | "outlined";
  /** カードのヘッダー部分に表示するコンテンツ（省略可） */
  header?: ReactNode;
}

/** バリアントごとの Tailwind CSS クラス定義 */
const variantStyles: Record<string, string> = {
  default: "bg-white shadow-md",
  outlined: "bg-white border border-gray-200",
};

/**
 * カードコンポーネント
 *
 * コンテンツをグルーピングして表示するためのコンテナ。
 * default（シャドウ付き）と outlined（ボーダー付き）の2バリアントを提供する。
 * header を指定するとヘッダー部分が表示される。
 */
export function Card({
  variant = "default",
  header,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-lg overflow-hidden ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-900">
          {header}
        </div>
      )}
      <div className="px-6 py-4 text-gray-700">{children}</div>
    </div>
  );
}
