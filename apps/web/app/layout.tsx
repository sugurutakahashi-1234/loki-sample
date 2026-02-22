/**
 * ルートレイアウト
 *
 * Next.js App Router の最上位レイアウト。
 * 全ページに共通する HTML 構造、メタデータ、グローバルスタイルを定義する。
 */
import type { Metadata } from "next";
import "./globals.css";
import { formatPageTitle } from "./utils/format";

/** サイト全体のメタデータ（<title> や <meta> タグに反映される） */
export const metadata: Metadata = {
  title: formatPageTitle(),
  description: "Playwright VRT + Storybook sample project with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
