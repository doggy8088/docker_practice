## 本章小結

| 要點 | 說明 |
|------|------|
| **作用** | 設定後續指令的工作目錄 |
| **語法** | `WORKDIR /path` |
| **自動建立** | 目錄不存在會自動建立 |
| **持久性** | 影響後續所有指令，直到下次 WORKDIR |
| **不要用** | `RUN cd /path` (無效)|

### 7.19.1 延伸閱讀

- [COPY 複製檔案](7.2_copy.md)：檔案複製
- [RUN 執行指令](../04_image/4.5_build.md)：執行建立指令
- [最佳實踐](../appendix/best_practices.md)：Dockerfile 編寫指南

| 要點 | 說明 |
|------|------|
| **作用** | 切換後續指令的執行使用者 |
| **語法** | `USER username` 或 `USER UID:GID` |
| **前提** | 使用者必須已存在 |
| **執行時覆蓋** | `docker run -u` |
| **切換工具** | 使用 gosu，不用 su/sudo |

### 7.19.2 延伸閱讀

- [安全](../18_security/README.md)：容器安全實踐
- [ENTRYPOINT](7.5_entrypoint.md)：入口指令碼中的使用者切換
- [最佳實踐](../appendix/best_practices.md)：Dockerfile 安全

| 要點 | 說明 |
|------|------|
| **作用** | 檢測容器應用是否真實可用 |
| **指令** | `HEALTHCHECK [選項] CMD command` |
| **狀態** | starting, healthy, unhealthy |
| **Compose** | 支援 `condition: service_healthy` 依賴 |
| **注意** | 避免副作用，節省資源 |

### 7.19.3 延伸閱讀

- [CMD 容器啟動指令](7.4_cmd.md)：啟動主程序
- [Compose 樣板檔案](../11_compose/11.5_compose_file.md)：Compose 中的健康檢查
- [Docker 除錯](../appendix/debug.md)：容器排障

| 要點 | 說明 |
|------|------|
| **作用** | 定義在子映象建立時執行的指令 |
| **語法** | `ONBUILD INSTRUCTION` |
| **適用** | 基礎架構映象 (Node, Python, Go 等)|
| **限制** | 只繼承一次，不可級聯 |
| **規範** | 建議使用 `-onbuild` 標籤字尾 |

### 7.19.4 延伸閱讀

- [COPY 指令](7.2_copy.md)：檔案複製
- [Dockerfile 最佳實踐](../appendix/best_practices.md)：基礎映象設計

| 要點 | 說明 |
|------|------|
| **作用** | 新增 key-value 元資料 |
| **語法** | `LABEL k=v k=v ...` |
| **規範** | 推薦使用 OCI 標準標籤 |
| **棄用** | 不要再使用 `MAINTAINER` |
| **檢視** | `docker inspect` |

### 7.19.5 延伸閱讀

- [OCI 標籤規範](https://github.com/opencontainers/image-spec/blob/main/annotations.md)
- [Dockerfile 最佳實踐](../appendix/best_practices.md)

| 要點 | 說明 |
|------|------|
| **作用** | 更改 RUN/CMD/ENTRYPOINT 的預設 shell |
| **Linux 預設** | `["/bin/sh", "-c"]` |
| **Windows 預設** | `["cmd", "/S", "/C"]` |
| **推薦用法** | `SHELL ["/bin/bash", "-o", "pipefail", "-c"]` |
| **影響範圍** | 後續所有使用 shell 格式的指令 |

### 7.19.6 延伸閱讀

- [RUN 指令](../04_image/4.5_build.md)：執行指令
- [Dockerfile 最佳實踐](../appendix/best_practices.md)：錯誤處理與除錯

| 要點 | 說明 |
|------|------|
| **作用** | 在新層執行指令 |
| **原則** | 合併指令，清理快取 |
| **格式** | Shell (常用) vs Exec |
| **陷阱** | `cd` 不持久，環境變數不持久 |
| **進階** | 使用 Cache Mount 加速建立 |

### 7.19.7 延伸閱讀

- [CMD 容器啟動指令](7.4_cmd.md)：容器啟動時的指令
- [WORKDIR 指定工作目錄](7.10_workdir.md)：改變目錄
- [Dockerfile 最佳實踐](../appendix/best_practices.md)

| 操作 | 範例 |
|------|------|
| 複製檔案 | `COPY app.js /app/` |
| 複製多個檔案 | `COPY *.json /app/` |
| 複製目錄內容 | `COPY src/ /app/src/` |
| 修改所有者 | `COPY --chown=node:node . /app/` |
| 從建立階段複製 | `COPY --from=builder /app/dist ./` |

### 7.19.8 延伸閱讀

- [ADD 指令](7.3_add.md)：複製和解壓
- [WORKDIR 指令](7.10_workdir.md)：設定工作目錄
- [多階段建立](7.17_multistage_builds.md)：最佳化映象大小
- [最佳實踐](../appendix/best_practices.md)：Dockerfile 編寫指南

| 場景 | 推薦指令 |
|------|---------|
| 複製普通檔案 | `COPY` |
| 複製目錄 | `COPY` |
| 自動解壓 tar | `ADD` |
| 從 URL 下載 | `RUN curl` |
| 保持 tar 不解壓 | `COPY` |

### 7.19.9 延伸閱讀

- [COPY 複製檔案](7.2_copy.md)：基本複製操作
- [多階段建立](7.17_multistage_builds.md)：減少映象體積
- [最佳實踐](../appendix/best_practices.md)：Dockerfile 編寫指南

| 要點 | 說明 |
|------|------|
| **作用** | 指定容器啟動時的預設指令 |
| **推薦格式** | exec 格式 `CMD ["程式", "引數"]` |
| **覆蓋方式** | `docker run image 新指令` |
| **與 ENTRYPOINT** | CMD 作為 ENTRYPOINT 的預設引數 |
| **核心原則** | 應用必須在前台執行 |

### 7.19.10 延伸閱讀

- [ENTRYPOINT 入口點](7.5_entrypoint.md)：固定的啟動指令
- [後台執行](../05_container/5.2_daemon.md)：容器前台/後台概念
- [最佳實踐](../appendix/best_practices.md)：Dockerfile 編寫指南

| ENTRYPOINT | CMD | 適用場景 |
|------------|-----|---------|
| ✓ | ✗ | 映象作為固定指令使用 |
| ✗ | ✓ | 簡單的預設指令 |
| ✓ | ✓ | **推薦**：固定指令 + 可設定引數 |

### 7.19.11 延伸閱讀

- [CMD 容器啟動指令](7.4_cmd.md)：預設指令
- [最佳實踐](../appendix/best_practices.md)：啟動指令設計
- [後台執行](../05_container/5.2_daemon.md)：前台/後台概念

| 要點 | 說明 |
|------|------|
| **語法** | `ENV KEY=value` |
| **作用範圍** | 建立時 + 執行時 |
| **覆蓋方式** | `docker run -e KEY=value` |
| **與 ARG** | ARG 僅建立時，ENV 持久化到執行時 |
| **安全** | 不要儲存敏感訊息 |

### 7.19.12 延伸閱讀

- [ARG 建立引數](7.7_arg.md)：建立時變數
- [Compose 環境變數](../11_compose/11.5_compose_file.md)：Compose 中的環境變數
- [最佳實踐](../appendix/best_practices.md)：Dockerfile 編寫指南

| 要點 | 說明 |
|------|------|
| **作用** | 定義建立時變數 |
| **語法** | `ARG NAME=value` |
| **覆蓋** | `docker build --build-arg NAME=value` |
| **作用域** | FROM 之後需要重新宣告 |
| **vs ENV** | ARG 僅建立時，ENV 建立+執行時 |
| **安全** | 不要儲存敏感訊息 |

### 7.19.13 延伸閱讀

- [ENV 設定環境變數](7.6_env.md)：執行時環境變數
- [FROM 指令](../04_image/4.5_build.md)：基礎映象指定
- [多階段建立](7.17_multistage_builds.md)：複雜建立場景

| 要點 | 說明 |
|------|------|
| **作用** | 建立掛載點，標記為外部卷 |
| **語法** | `VOLUME /path` |
| **預設行為** | 自動建立匿名卷 |
| **覆蓋方式** | `docker run -v name:/path` |
| **注意** | VOLUME 之後的修改會丟失 |

### 7.19.14 延伸閱讀

- [資料卷](../08_data/8.1_volume.md)：卷的管理和使用
- [掛載主機目錄](../08_data/8.2_bind-mounts.md)：Bind Mount
- [Compose 資料管理](../11_compose/11.5_compose_file.md)：Compose 中的卷設定

| 要點 | 說明 |
|------|------|
| **作用** | 宣告容器提供服務的連接埠 (文件)|
| **不會** | 自動對映連接埠或開放外部訪問 |
| **配合** | `docker run -P` 自動對映 |
| **外部訪問** | 需要 `-p 宿主機連接埠:容器連接埠` |
| **語法** | `EXPOSE 80` 或 `EXPOSE 80/tcp` |

### 7.19.15 延伸閱讀

- [網路設定](../09_network/README.md)：Docker 網路詳解
- [連接埠對映](../09_network/9.5_port_mapping.md)：-p 引數詳解
- [Compose 連接埠](../11_compose/11.5_compose_file.md)：Compose 中的連接埠設定
