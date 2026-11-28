# 經自動驗證的範例

本目錄儲存書中四類關鍵範例的單一真相源：Compose、Dockerfile、Kubernetes 清單和 GitHub Actions 工作流。`tools/test_examples.py` 會呼叫這些工具各自的原生校驗指令；CI 中缺少任一工具都會失敗，本地環境缺少工具則明確報告 `SKIP`。
