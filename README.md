# ts-slack-message-api

TypeScript と Slack Incoming Webhook を用いてメッセージを (手動 / 定期) 送信するシンプルなプロジェクト。

## 特長
- TypeScript + Node.js
- Slack チャンネルへのテキスト送信サンプル
- GitHub Actions による日本時間 20:00 定期送信例
- `.env` / GitHub Secrets による Webhook URL 管理
- 最小構成で拡張しやすい

## 前提条件
- Node.js 18+ (例では 22)
- npm
- Slack Incoming Webhook URL

## セットアップ

```bash
    git clone <YOUR_REPO_URL>
    cd ts-slack-message-api
    npm install
    npm run build
```

## 環境変数・環境別設定
ローカルでは `.env` (必要なら追加) または実行時に環境変数指定。GitHub Actions では Secrets を利用。

- `src/config/config.dev.ts` ... 開発用設定
- `src/config/config.prod.ts` ... 本番用設定
- `NODE_ENV` で切り替え（例: `NODE_ENV=production`）

例 (.env):
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

## 開発フロー
1. 変更
2. npm run dev でホット実行
3. npm run build でトランスパイル
4. Push して Actions の手動 / スケジュール結果確認

## トラブルシュート
| 症状 | 確認ポイント |
|------|--------------|
| 送信されない | Webhook URL が正しいか確認 |
| 404 | Webhook URL の有効性を確認 |
| 時刻ずれ | cron は常に UTC 指定か再確認 |
| TypeError | 環境変数未設定 (.env / Secrets) |

## セキュリティ・Secretsローテーション手順
- Webhook URL は必ず Secrets / .env に保持
- ログへ機密値を出力しない
- 不要になった Webhook は Slack で無効化

### Secretsローテーション手順
1. Slackで新しいWebhook URLを発行
2. GitHubリポジトリのSettings > Secretsで`SLACK_WEBHOOK_URL`を新しい値に更新
3. `.env`ファイルも同様に更新（ローカル開発時）
4. 古いWebhookはSlack管理画面で無効化
5. 必要に応じてCI/CDを再実行し、正常動作を確認

## ライセンス
本プロジェクトは MIT License の下で提供されます。詳細は `LICENSE` を参照してください。
