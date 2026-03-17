/**
 * OpenNext 設定
 *
 * Next.js を Cloudflare Workers 上で動作させるためのアダプタ設定。
 * 最小構成で defineCloudflareConfig() を呼ぶだけで動作する。
 *
 * ISR（Incremental Static Regeneration）を使う場合は、
 * R2 バケットを incrementalCache に設定する必要がある。
 * 現時点では ISR 不要のため最小構成で運用する。
 */
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
