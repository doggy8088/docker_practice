## 3.11 本章小結

Docker 支援在多種平台上安裝和使用，選擇合適的安裝方式是順利使用 Docker 的第一步。

| 平台 | 推薦方式 | 說明 |
|------|---------|------|
| **Ubuntu/Debian** | 官方 APT 倉庫 | 最完善的支援，推薦首選 |
| **CentOS/Fedora** | 官方 YUM/DNF 倉庫 | 注意關閉 SELinux 或設定策略 |
| **macOS** | Docker Desktop | 圖形化安裝，包含 Compose 和 Kubernetes |
| **Windows 10/11** | Docker Desktop (WSL 2) | 需啟用 WSL 2 後端 |
| **Raspberry Pi** | 官方安裝指令碼 | 支援 ARM 架構 |
| **離線環境** | 二進位封裝安裝 | 適用於無法聯網的伺服器 |

### 3.11.1 安裝後驗證

安裝完成後，執行以下指令驗證 Docker 是否正常工作：

```bash
$ docker version
$ docker run --rm hello-world
```

### 3.11.2 延伸閱讀

- [映象加速器](3.9_mirror.md)：解決國內拉取映象慢的問題
- [開啟實驗屬性](3.10_experimental.md)：使用最新功能
- [Docker Hub](../06_repository/6.1_dockerhub.md)：官方映象倉庫
