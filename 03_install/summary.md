## 本章小結

Docker 支援在多種平台上安裝和使用，選擇合適的安裝方式是順利使用 Docker 的第一步。

| 平台 | 推薦方式 | 說明 |
|------|---------|------|
| **Ubuntu/Debian** | 官方 APT 倉庫 | 最完善的支援，推薦首選 |
| **CentOS/Fedora** | 官方 DNF/YUM 倉庫 | 注意驗證防火牆與 `iptables` 相容性 |
| **macOS** | Docker Desktop | 圖形化安裝，預設整合 Compose |
| **Windows 10/11** | Docker Desktop（WSL 2 或 Hyper-V） | 按機器能力與企業策略選擇後端 |
| **Raspberry Pi** | 官方 APT 倉庫或 Debian `arm64` 方案 | 32 位系統已停止接收 v29+ 新主版本 |
| **離線環境** | 二進位封裝安裝 | 適用於無法聯網的伺服器 |

### 安裝後驗證

安裝完成後，執行以下指令驗證 Docker 是否正常工作：

```bash
$ docker version
$ docker run --rm hello-world
```

### 延伸閱讀

- [映象加速器](3.9_mirror.md)：解決國內拉取映象慢的問題
- [開啟實驗屬性](3.10_experimental.md)：使用最新功能
- [Docker Hub](../06_repository/6.1_dockerhub.md)：官方映象倉庫
---

> 📝 **發現錯誤或有改進建議？** 歡迎送出 [Issue](https://github.com/yeasy/docker_practice/issues) 或 [PR](https://github.com/yeasy/docker_practice/pulls)。
