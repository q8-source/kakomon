@echo off
chcp 65001 > nul
REM Kakomon - 簡単起動スクリプト
REM このスクリプトで、初心者でも簡単にアプリケーションを起動できます

echo ==================================
echo 行政書士試験 過去問学習アプリ
echo Kakomon - 起動スクリプト
echo ==================================
echo.

REM ステップ1: Node.jsのバージョン確認
echo ✓ 環境確認中...
where node > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ エラー: Node.js がインストールされていません。
    echo    以下のサイトからインストールしてください: https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set node_version=%%i
echo   Node.js バージョン: %node_version%
echo.

REM ステップ2: 依存パッケージのインストール
echo ✓ 依存パッケージをインストール中...
if not exist "node_modules" (
    echo   インストール中... ^(初回は時間がかかります^)
    call npm run install:all
) else (
    echo   ✓ 既にインストール済み
)
echo.

REM ステップ3: アプリケーション起動
echo ✓ アプリケーション起動中...
echo.
echo ====================================================================
echo サーバーが起動します。以下のURLにアクセスしてください:
echo.
echo   🌐 http://localhost:3000
echo.
echo Ctrl+C で終了できます
echo ====================================================================
echo.

REM 開発サーバーの起動
call npm run dev
pause
