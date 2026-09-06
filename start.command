#!/bin/bash
set -e
cd "$(dirname "$0")"
PORT=4173
echo "正在启动陕北秧歌网页预览..."
python3 -m http.server "$PORT" >/tmp/yangge-preview.log 2>&1 &
SERVER_PID=$!
cleanup() {
  kill "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM
sleep 1
open "http://127.0.0.1:${PORT}/"
echo "网页已打开。关闭此窗口即可停止预览。"
wait "$SERVER_PID"
