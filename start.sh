#!/bin/bash

# Kakomon - 簡単起動スクリプト
# このスクリプトで、初心者でも簡単にアプリケーションを起動できます

echo "=================================="
echo "行政書士試験 過去問学習アプリ"
echo "Kakomon - 起動スクリプト"
echo "=================================="
echo ""

# ステップ1: Node.jsのバージョン確認
echo "✓ 環境確認中..."
if ! command -v node &> /dev/null; then
    echo "❌ エラー: Node.js がインストールされていません。"
    echo "   以下のサイトからインストールしてください: https://nodejs.org"
    exit 1
fi

node_version=$(node -v)
echo "  Node.js バージョン: $node_version"
echo ""

# ステップ2: 依存パッケージのインストール確認
echo "✓ 依存パッケージをインストール中..."
if [ ! -d "node_modules" ] || [ ! -d "server/node_modules" ] || [ ! -d "client/node_modules" ]; then
    npm run install:all > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "  ✓ インストール完了"
    else
        echo "  インストール中... (初回は時間がかかります)"
        npm run install:all
    fi
else
    echo "  ✓ 既にインストール済み"
fi
echo ""

# ステップ3: アプリケーション起動
echo "✓ アプリケーション起動中..."
echo ""
echo "==================================・=================================="
echo "サーバーが起動します。以下のURLにアクセスしてください:"
echo ""
echo "  🌐 http://localhost:3000"
echo ""
echo "Ctrl+C で終了できます"
echo "========================================================================"
echo ""

# 開発サーバーの起動
npm run dev
