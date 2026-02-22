## 本章小結

相關訊息如下表：

| 要點 | 說明 |
|------|------|
| **作用** | 將宿主機目錄掛載到容器 |
| **語法** | `-v /宿主機:/容器` 或 `--mount type=bind,...` |
| **只讀** | 新增 `readonly` 或 `:ro` |
| **適用場景** | 開發環境、設定檔案、日誌 |
| **vs Volume** | Bind 更靈活，Volume 更適合生產 |

### 延伸閱讀

- [資料卷](volume.md)：Docker 管理的持久化儲存
- [tmpfs 掛載](tmpfs.md)：記憶體臨時儲存
- [Compose 資料管理](../../10_compose/10.5_compose_file.md)：Compose 中的掛載設定

| 操作 | 指令 |
|------|------|
| 建立資料卷 | `docker volume create name` |
| 列出資料卷 | `docker volume ls` |
| 檢視詳情 | `docker volume inspect name` |
| 刪除資料卷 | `docker volume rm name` |
| 清理未用 | `docker volume prune` |
| 掛載資料卷 | `-v name:/path` 或 `--mount source=name,target=/path` |

### 延伸閱讀

- [繫結掛載](bind-mounts.md)：掛載宿主機目錄
- [tmpfs 掛載](tmpfs.md)：記憶體中的臨時儲存
- [儲存驅動](../../14_implementation/14.4_ufs.md)：Docker 儲存的底層原理
