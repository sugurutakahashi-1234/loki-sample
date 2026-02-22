/**
 * Docker 環境でリファレンス画像を更新するスクリプト
 *
 * CI（Linux Docker）と同じ Playwright イメージを使用することで、
 * macOS とのレンダリング差異を解消し、ローカルでもリファレンス画像を更新できるようにする。
 *
 * OS ごとにスナップショットが分離されているため、CI 用（linux）のリファレンス画像は
 * このスクリプトで Docker 経由で更新し、ローカル用（darwin）はローカルコマンドで更新する。
 *
 * 使い方:
 *   全プラットフォーム（local + docker）:
 *     bun run update-snapshots                          # VRT + E2E すべて
 *     bun run storybook:vrt:update-snapshots            # VRT のみ
 *     bun run web:e2e:update-snapshots                  # E2E のみ
 *
 *   Docker（CI 用 linux スナップショット）のみ:
 *     bun run storybook:vrt:update-snapshots:docker     # VRT
 *     bun run web:e2e:update-snapshots:docker            # E2E
 *
 *   ローカル（macOS 用 darwin スナップショット）のみ:
 *     bun run storybook:vrt:update-snapshots:local      # VRT
 *     bun run web:e2e:update-snapshots:local             # E2E
 */

import { join } from "node:path";

const rootDir = join(import.meta.dirname, "..");

// --- Docker デーモンの起動チェック ---
// Docker が起動していない場合は colima での自動起動を試みる
const dockerCheck = Bun.spawnSync(["docker", "info"], {
  stdout: "ignore",
  stderr: "ignore",
});
if (dockerCheck.exitCode !== 0) {
  // colima が使えるか確認
  const colimaCheck = Bun.spawnSync(["which", "colima"], {
    stdout: "ignore",
    stderr: "ignore",
  });

  if (colimaCheck.exitCode === 0) {
    console.log("Docker デーモンが未起動です。colima を起動しています...");
    const colima = Bun.spawnSync(["colima", "start"], {
      stdout: "inherit",
      stderr: "inherit",
    });
    if (colima.exitCode !== 0) {
      console.error("ERROR: colima の起動に失敗しました。");
      process.exit(1);
    }
  } else {
    console.error("ERROR: Docker デーモンに接続できません。");
    console.error("Docker Desktop または colima を起動してください。");
    process.exit(1);
  }
}

// --- 引数パース ---
// vrt / e2e / both のいずれかを受け付ける（デフォルト: both）
const target = process.argv[2] ?? "both";
if (!["vrt", "e2e", "both"].includes(target)) {
  console.error("ERROR: 引数は vrt / e2e / both のいずれかを指定してください");
  console.error("Usage: bun scripts/update-snapshots-docker.ts [vrt|e2e|both]");
  process.exit(1);
}

// --- Playwright バージョン取得 ---
// packages/ui/package.json から @playwright/test のバージョンを読み取り、
// 対応する Docker イメージタグを決定する（^1.58.2 → 1.58.2）
const pkgJson = await Bun.file(
  join(rootDir, "packages/ui/package.json")
).json();
const rawVersion: string | undefined =
  pkgJson.devDependencies?.["@playwright/test"];

if (!rawVersion) {
  console.error(
    "ERROR: @playwright/test が packages/ui/package.json に見つかりません"
  );
  process.exit(1);
}

const playwrightVersion = rawVersion.replace(/^\^/, "");
const image = `mcr.microsoft.com/playwright:v${playwrightVersion}-noble`;

console.log(`Using Docker image: ${image}`);
console.log(`Target: ${target}`);

const startTime = performance.now();

// --- Docker コンテナ内で bun をインストールするための共通セットアップ ---
const installBun = `
  apt-get update && apt-get install -y unzip
  curl -fsSL https://bun.sh/install | bash
  export BUN_INSTALL="$HOME/.bun"
  export PATH="$BUN_INSTALL/bin:$PATH"
  bun install --frozen-lockfile
`;

// --- Docker コンテナ実行ヘルパー ---
// プロジェクトルートをマウントし、CI=true 環境変数付きでスクリプトを実行する
const dockerRun = (script: string) => {
  const proc = Bun.spawnSync(
    [
      "docker",
      "run",
      "--rm",
      "-v",
      `${rootDir}:/work`,
      "-w",
      "/work",
      "-e",
      "CI=true",
      image,
      "bash",
      "-c",
      `${installBun}\n${script}`,
    ],
    { stdout: "inherit", stderr: "inherit" }
  );
  if (proc.exitCode !== 0) {
    process.exit(proc.exitCode);
  }
};

// --- VRT スナップショット更新 ---
if (target === "vrt" || target === "both") {
  console.log("\n--- Updating VRT snapshots ---");
  dockerRun(`
    cd packages/ui
    bun run vrt:update-snapshots
  `);
}

// --- E2E スナップショット更新 ---
if (target === "e2e" || target === "both") {
  console.log("\n--- Updating E2E snapshots ---");
  dockerRun(`
    cd apps/web
    bun run build
    bun run e2e:update-snapshots
  `);
}

const elapsedSec = ((performance.now() - startTime) / 1000).toFixed(1);
console.log(`\nDone! リファレンス画像が更新されました。 [${elapsedSec}s]`);
