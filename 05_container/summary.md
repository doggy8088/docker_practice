## 本章小結

相關訊息如下表：

| 操作 | 指令 | 說明 |
|------|------|------|
| 新建並執行 | `docker run` | 最常用的啟動方式 |
| 互動式啟動 | `docker run -it` | 用於除錯或臨時操作 |
| 後台執行 | `docker run -d` | 用於服務類別應用 |
| 啟動已停止的容器 | `docker start` | 重用已有容器 |

### 延伸閱讀

- [後台執行](5.2_daemon.md)：理解 `-d` 引數和容器生命週期
- [進入容器](5.4_attach_exec.md)：操作執行中的容器
- [網路設定](../08_data_network/network/README.md)：理解連接埠對映的原理
- [資料管理](../08_data_network/README.md)：資料持久化方案

| 操作 | 指令 | 說明 |
|------|------|------|
| 優雅停止 | `docker stop` | 先 SIGTERM，超時後 SIGKILL |
| 強制停止 | `docker kill` | 直接 SIGKILL |
| 重新啟動 | `docker start` | 啟動已停止的容器 |
| 重啟 | `docker restart` | 停止後立即啟動 |
| 停止全部 | `docker stop $(docker ps -q)` | 停止所有執行中容器 |

### 延伸閱讀

- [啟動容器](../05_container/5.1_run.md)：容器啟動詳解
- [刪除容器](5.6_rm.md)：清理容器
- [容器日誌](5.2_daemon.md)：排查停止原因

| 需求 | 推薦指令 |
|------|---------|
| 進入容器除錯 | `docker exec -it 容器名 bash` |
| 執行單條指令 | `docker exec 容器名 指令` |
| 檢視主程序輸出 | `docker attach 容器名` (慎用)|

### 延伸閱讀

- [後台執行](5.2_daemon.md)：理解容器主程序
- [檢視容器](5.1_run.md)：列出和過濾容器
- [容器日誌](5.2_daemon.md)：檢視容器輸出

| 操作 | 指令 |
|------|------|
| 刪除已停止容器 | `docker rm 容器名` |
| 強制刪除執行中容器 | `docker rm -f 容器名` |
| 刪除容器及匿名卷 | `docker rm -v 容器名` |
| 清理所有已停止容器 | `docker container prune` |
| 刪除所有容器 | `docker rm -f $(docker ps -aq)` |

### 延伸閱讀

- [終止容器](5.3_stop.md)：優雅停止容器
- [刪除映象](../04_image/4.3_rm.md)：清理映象
- [資料卷](../08_data_network/data/volume.md)：資料卷管理
