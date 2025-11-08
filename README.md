# 行政書士試験 過去問学習アプリ

行政書士試験の過去問題を学習するためのWebアプリケーションです。

## 🚀 クイックスタート（初心者向け）

**Windows ユーザー:**
```bash
start.bat
```

**Mac/Linux ユーザー:**
```bash
bash start.sh
```

これで自動的にセットアップ・起動されます！その後、ブラウザで **http://localhost:3000** を開いてください。

---

## 機能

- 📚 過去問題の表示と回答
- ✅ 即座の正誤判定とフィードバック
- 📊 学習進捗の追跡
- 🎯 スコア計算と結果表示
- 🔍 年度・科目別フィルタリング
- 📱 レスポンシブデザイン

## 技術スタック

### フロントエンド
- React 18
- TypeScript
- Vite
- CSS Modules

### バックエンド
- Node.js
- Express
- CORS対応

## セットアップ

### 必要要件

- Node.js 18以上
- npm

### インストール手順

1. リポジトリをクローン
```bash
git clone <repository-url>
cd kakomon
```

2. 依存関係をインストール
```bash
npm run install:all
```

このコマンドは以下を実行します：
- ルートディレクトリの依存関係をインストール
- サーバーの依存関係をインストール
- クライアントの依存関係をインストール

## 起動方法

### 開発環境

ルートディレクトリから以下のコマンドで、サーバーとクライアントを同時に起動できます：

```bash
npm run dev
```

これにより：
- バックエンドサーバー: http://localhost:3001
- フロントエンドアプリ: http://localhost:3000

が起動します。

### 個別起動

サーバーとクライアントを個別に起動することもできます：

```bash
# サーバーのみ起動
npm run dev:server

# クライアントのみ起動
npm run dev:client
```

## 使い方

1. ブラウザで http://localhost:3000 にアクセス
2. フィルターで年度や科目を選択（オプション）
3. 問題一覧から解きたい問題を選択
4. 選択肢から解答を選んで「解答する」ボタンをクリック
5. 即座に正誤判定と解説が表示されます
6. 全問題を解答したら「結果を見る」で成績を確認

## プロジェクト構造

```
kakomon/
├── client/                 # フロントエンド
│   ├── src/
│   │   ├── components/    # Reactコンポーネント
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── QuestionList.tsx
│   │   │   ├── QuestionView.tsx
│   │   │   └── Results.tsx
│   │   ├── App.tsx        # メインアプリケーション
│   │   ├── types.ts       # TypeScript型定義
│   │   └── main.tsx       # エントリーポイント
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── server/                # バックエンド
│   ├── data/
│   │   └── questions.json # 問題データ
│   ├── server.js          # Expressサーバー
│   └── package.json
├── package.json
└── README.md
```

## API エンドポイント

### GET /api/questions
すべての問題を取得、またはフィルタリング

クエリパラメータ：
- `year`: 年度でフィルタ
- `subject`: 科目でフィルタ
- `limit`: 取得数の制限

### GET /api/questions/:id
特定の問題を取得

### GET /api/years
利用可能な年度の一覧を取得

### GET /api/subjects
利用可能な科目の一覧を取得

### POST /api/submit-answer
解答を送信して正誤判定を取得

リクエストボディ：
```json
{
  "questionId": 1,
  "answer": 0
}
```

レスポンス：
```json
{
  "isCorrect": true,
  "correctAnswer": 0,
  "explanation": "解説文..."
}
```

## 問題データの追加

`server/data/questions.json` に新しい問題を追加できます。

問題の形式：
```json
{
  "id": 1,
  "year": 2023,
  "subject": "基礎法学",
  "questionNumber": 1,
  "question": "問題文",
  "choices": [
    "選択肢1",
    "選択肢2",
    "選択肢3",
    "選択肢4"
  ],
  "correctAnswer": 0,
  "explanation": "解説文"
}
```

- `id`: 一意のID（数値）
- `year`: 年度
- `subject`: 科目名
- `questionNumber`: 問題番号
- `question`: 問題文
- `choices`: 選択肢の配列
- `correctAnswer`: 正解の選択肢インデックス（0始まり）
- `explanation`: 解説文

## ビルド

本番環境用にビルドする場合：

```bash
npm run build
```

ビルドされたファイルは `client/dist/` に出力されます。

## ライセンス

MIT
