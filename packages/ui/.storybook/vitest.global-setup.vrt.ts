/**
 * VRT テストのグローバルセットアップ／ティアダウン（Node.js コンテキストで実行）
 *
 * setup: テスト実行前にベースラインディレクトリをクリアし、
 *        削除されたストーリーの古いスクリーンショットが残らないようにする。
 * teardown (return): storybook-addon-vis が生成したスナップショットを
 *                    reg-cli 用の .reg/actual/ と git 管理用の vrt/screenshots/ にコピーする。
 *
 * vitest globalSetup の teardown は default export した関数の戻り値として定義する。
 * named export の teardown は vitest に認識されないため注意。
 */
import { cpSync, existsSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

// vitest globalSetup は default export した関数を setup として実行し、
// その戻り値の関数を teardown として実行する
const setup = () => {
  const visRoot = join(import.meta.dirname, "..", "__vis__");
  const platform = process.env.CI ? process.platform : "local";
  const baselinesDir = join(visRoot, platform, "__baselines__");

  rmSync(baselinesDir, { recursive: true, force: true });

  // teardown: テスト完了後にスナップショットをコピー
  return () => {
    const projectRoot = join(import.meta.dirname, "..");

    // __vis__/ 配下のプラットフォームディレクトリを検索（local, linux, darwin, win32）
    const platformDirs = existsSync(visRoot)
      ? readdirSync(visRoot).filter((d) =>
          existsSync(join(visRoot, d, "__baselines__"))
        )
      : [];

    if (platformDirs.length === 0) {
      console.error("Warning: No __vis__/*/__baselines__/ directory found.");
      return;
    }

    const snapshotDir = join(visRoot, platformDirs[0], "__baselines__");
    const regActualDir = join(projectRoot, ".reg", "actual");
    const screenshotsDir = join(projectRoot, "vrt", "screenshots");

    // コピー先をクリーンアップ（削除済みストーリーの残存防止）
    rmSync(regActualDir, { recursive: true, force: true });
    cpSync(snapshotDir, regActualDir, { recursive: true });
    console.log(`Copied: ${snapshotDir} -> ${regActualDir}`);

    // macOS のみ: git 管理用の vrt/screenshots/ にもコピー
    if (process.platform === "darwin") {
      rmSync(screenshotsDir, { recursive: true, force: true });
      cpSync(snapshotDir, screenshotsDir, { recursive: true });
      console.log(`Copied: ${snapshotDir} -> ${screenshotsDir}`);
    }
  };
};

export default setup;
