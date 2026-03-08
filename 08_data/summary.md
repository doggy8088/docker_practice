## 本章小結

本章介紹了 Docker 的三種資料管理方式：資料卷 (Volume)、繫結掛載 (Bind Mount) 和 tmpfs 掛載。

| 方式 | 特點 | 適用場景 |
|------|------|---------|
| **資料卷 (Volume)** | Docker 管理，生命週期獨立於容器 | 資料庫、應用資料（推薦生產環境） |
| **繫結掛載 (Bind Mount)** | 掛載宿主機目錄，更靈活 | 開發環境、設定檔案、日誌 |
| **tmpfs 掛載** | 僅儲存在記憶體中，容器停止即消失 | 臨時敏感資料、快取記憶體 |

| 操作 | 指令 |
|------|------|
| 建立資料卷 | `docker volume create name` |
| 列出資料卷 | `docker volume ls` |
| 檢視詳情 | `docker volume inspect name` |
| 刪除資料卷 | `docker volume rm name` |
| 清理未用 | `docker volume prune` |
| 掛載資料卷 | `-v name:/path` 或 `--mount source=name,target=/path` |

### 延伸閱讀

- [資料卷](8.1_volume.md)：Docker 管理的持久化儲存
- [繫結掛載](8.2_bind-mounts.md)：掛載宿主機目錄
- [tmpfs 掛載](8.3_tmpfs.md)：記憶體中的臨時儲存
- [儲存驅動](../12_implementation/12.4_ufs.md)：Docker 儲存的底層原理
- [Compose 資料管理](../11_compose/11.5_compose_file.md)：Compose 中的掛載設定
