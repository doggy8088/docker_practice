## 本章小結

本章詳細介紹了 Dockerfile 的所有核心指令，以下是各指令要點的速查表。

| 指令 | 作用 | 關鍵要點 |
|------|------|---------|
| **FROM** | 指定基礎映象 | 必須是第一條指令 |
| **RUN** | 在新層執行指令 | 合併指令、清理快取以減小體積 |
| **COPY** | 複製檔案 | 優先使用，支援 `--from` |
| **ADD** | 更高階的複製 | 自動解壓 tar；公開遠端 artifact 應配合 `--checksum` |
| **CMD** | 容器啟動預設指令 | 可被 `docker run` 引數覆蓋 |
| **ENTRYPOINT** | 容器入口點 | 固定啟動指令，CMD 作為預設引數 |
| **ENV** | 設定環境變數 | 建立時 + 執行時均生效 |
| **ARG** | 建立引數 | 僅建立時生效，FROM 後需重新宣告 |
| **VOLUME** | 定義匿名卷 | 執行時掛載會遮蔽映象內目錄；建立後續寫入語義依賴 builder |
| **EXPOSE** | 宣告連接埠 | 僅文件作用，不自動對映 |
| **WORKDIR** | 指定工作目錄 | 替代 `RUN cd`，目錄不存在會自動建立 |
| **USER** | 指定執行使用者 | 使用者必須已存在，推薦 gosu |
| **HEALTHCHECK** | 健康檢查 | 支援 starting/healthy/unhealthy 狀態 |
| **ONBUILD** | 延遲執行指令 | 只繼承一次，不可級聯 |
| **LABEL** | 新增元資料 | 推薦 OCI 標準標籤，替代 MAINTAINER |
| **SHELL** | 更改預設 shell | 推薦 `["/bin/bash", "-o", "pipefail", "-c"]` |

### 生產映象快速檢查清單

在將映象推向生產之前，建議逐條過一遍以下清單：

- [ ] 基礎映象選擇了最小化版本（如 `alpine`、`distroless`）
- [ ] 使用了[多階段建立](7.17_multistage_builds.md)，最終映象不含編譯工具鏈
- [ ] 以非 root 使用者執行（`USER` 指令）
- [ ] `COPY` 優先於 `ADD`，且僅複製必要檔案
- [ ] `RUN` 指令合併了 `apt-get update && install && rm -rf /var/lib/apt/lists/*`
- [ ] 設定了 `HEALTHCHECK`
- [ ] 使用了 `.dockerignore` 排除 `.git`、`node_modules` 等無關檔案
- [ ] 映象標籤使用了具體版本號或 commit hash，而非 `latest`

> 更完整的編寫指南見[附錄：Dockerfile 最佳實踐](../appendix/best_practices.md)。

### 延伸閱讀

- [使用 Dockerfile 定製映象](../04_image/4.5_build.md)：Dockerfile 入門
- [多階段建立](7.17_multistage_builds.md)：最佳化映象大小
- [Dockerfile 最佳實踐](../appendix/best_practices.md)：編寫指南
- [安全](../18_security/README.md)：容器安全實踐
- [Compose 樣板檔案](../11_compose/11.5_compose_file.md)：Compose 中的設定
---

> 📝 **發現錯誤或有改進建議？** 歡迎送出 [Issue](https://github.com/doggy8088/docker_practice/issues) 或 [PR](https://github.com/doggy8088/docker_practice/pulls)。
