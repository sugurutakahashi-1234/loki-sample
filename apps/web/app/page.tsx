/**
 * ホームページ
 *
 * UI パッケージの共有コンポーネント（Button, Card, Badge）を一覧表示するデモページ。
 * 各コンポーネントのバリアントやサイズを確認できる。
 */
import { Badge, Button, Card } from "@loki-sample/ui";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        Playwright VRT + Storybook Demo
      </h1>
      <p className="mb-12 text-lg text-gray-600">
        Playwrightを使ったビジュアルリグレッションテスト（VRT）とE2Eテストのサンプルプロジェクトです。
      </p>

      {/* Button コンポーネントのデモ: バリアント（Primary/Secondary/Danger）とサイズ（S/M/L） */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Button</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Card コンポーネントのデモ: Default（シャドウ）と Outlined（ボーダー） */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Card</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card header="Default Card">
            シャドウ付きのデフォルトカードです。様々なコンテンツを格納できます。
          </Card>
          <Card variant="outlined" header="Outlined Card">
            ボーダー付きのアウトラインカードです。軽い印象を与えます。
          </Card>
        </div>
      </section>

      {/* Badge コンポーネントのデモ: Info/Success/Warning/Error の4バリアント */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Badge</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="info">Info</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </section>
    </main>
  );
}
