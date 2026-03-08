## 本章小結

本章詳細介紹了 Dockerfile 的所有核心指令，以下是各指令要點的速查表。

| 指令 | 作用 | 關鍵要點 |
|------|------|---------|
| **FROM** | 指定基礎映象 | 必須是第一條指令 |
| **RUN** | 在新層執行指令 | 合併指令、清理快取以減小體積 |
| **COPY** | 複製檔案 | 優先使用，支援 `--from` |
| **ADD** | 更高階的複製 | 自動解壓 tar，不推薦用於下載 |
| **CMD** | 容器啟動預設指令 | 可被 `docker run` 引數覆蓋 |
| **ENTRYPOINT** | 容器入口點 | 固定啟動指令，CMD 作為預設引數 |
| **ENV** | 設定環境變數 | 建立時 + 執行時均生效 |
| **ARG** | 建立引數 | 僅建立時生效，FROM 後需重新宣告 |
| **VOLUME** | 定義匿名卷 | VOLUME 之後的修改會丟失 |
| **EXPOSE** | 宣告連接埠 | 僅文件作用，不自動對映 |
| **WORKDIR** | 指定工作目錄 | 替代 `RUN cd`，目錄不存在會自動建立 |
| **USER** | 指定執行使用者 | 使用者必須已存在，推薦 gosu |
| **HEALTHCHECK** | 健康檢查 | 支援 starting/healthy/unhealthy 狀態 |
| **ONBUILD** | 延遲執行指令 | 只繼承一次，不可級聯 |
| **LABEL** | 新增元資料 | 推薦 OCI 標準標籤，替代 MAINTAINER |
| **SHELL** | 更改預設 shell | 推薦 `["/bin/bash", "-o", "pipefail", "-c"]` |

### 延伸閱讀

- [使用 Dockerfile 定製映象](../04_image/4.5_build.md)：Dockerfile 入門
- [多階段建立](7.17_multistage_builds.md)：最佳化映象大小
- [Dockerfile 最佳實踐](../appendix/best_practices.md)：編寫指南
- [安全](../18_security/README.md)：容器安全實踐
- [Compose 樣板檔案](../11_compose/11.5_compose_file.md)：Compose 中的設定
