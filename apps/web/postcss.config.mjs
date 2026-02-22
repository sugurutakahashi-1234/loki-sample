/**
 * PostCSS 設定
 *
 * Next.js の CSS 処理パイプラインで使用される PostCSS プラグインを定義する。
 * Tailwind CSS v4 は PostCSS プラグインとして動作する。
 *
 * 注意: packages/ui では Vite プラグイン（@tailwindcss/vite）を使用しているが、
 * Next.js では PostCSS プラグイン（@tailwindcss/postcss）を使用する。
 */
const config = {
  plugins: {
    // Tailwind CSS v4 の PostCSS プラグイン
    "@tailwindcss/postcss": {},
  },
};

export default config;
