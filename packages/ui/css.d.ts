// CSS ファイルの import を TypeScript に認識させるための型宣言
// tsgo が .storybook/preview.tsx の CSS import もチェックするため必要
declare module "*.css" {}
