/**
 * Playwright バージョン整合性チェック
 *
 * package.json の @playwright/test バージョンと
 * GitHub Actions ワークフローの Docker イメージバージョンが一致しているか検証する。
 */

import { join } from "node:path";
import { Glob } from "bun";

const startTime = performance.now();
const rootDir = join(import.meta.dirname, "..");
const workflowsDir = join(rootDir, ".github/workflows");

// package.json から @playwright/test のバージョンを取得（^1.58.2 → 1.58.2）
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

const pkgVersion = rawVersion.replace(/^\^/, "");

// ワークフローファイルから Docker イメージのバージョンを抽出してチェック
const dockerImagePattern = /mcr\.microsoft\.com\/playwright:v([0-9.]+)/;
let hasMismatch = false;

const glob = new Glob("*.yml");
for await (const file of glob.scan(workflowsDir)) {
  const content = await Bun.file(join(workflowsDir, file)).text();
  const match = content.match(dockerImagePattern);

  if (match && match[1] !== pkgVersion) {
    console.error(
      `MISMATCH: ${file} の Docker イメージ v${match[1]} != @playwright/test ${pkgVersion}`
    );
    hasMismatch = true;
  }
}

const elapsed = (performance.now() - startTime).toFixed(2);

if (hasMismatch) {
  console.error(
    "\npackage.json の @playwright/test バージョンとワークフローの Docker イメージバージョンを一致させてください"
  );
  process.exit(1);
}

console.log(
  `OK: Playwright バージョン整合性チェック (v${pkgVersion}) [${elapsed}ms]`
);
