## 本章小結

| 概念 | 要點 |
|------|------|
| **映象是什麼** | 只讀的應用樣板，包含執行所需的一切 |
| **分層儲存** | 多層疊加，共享基礎層，節省空間 |
| **只讀屬性** | 建立後不可修改，保證一致性 |
| **層的陷阱** | 刪除操作只是標記，不減小體積 |

理解了映象，接下來讓我們學習[容器](2.2_container.md)——映象的執行實例。

### 2.4.1 延伸閱讀

- [獲取映象](../04_image/4.1_pull.md)：從 Registry 下載映象
- [使用 Dockerfile 定製映象](../04_image/4.5_build.md)：建立自己的映象
- [Dockerfile 最佳實踐](../appendix/best_practices.md)：建立高質量映象的技巧
- [底層實現 - 聯合檔案系統](../12_implementation/12.4_ufs.md)：深入理解分層儲存的技術原理

| 概念 | 要點 |
|------|------|
| **容器是什麼** | 映象的執行實例，本質是隔離的程序 |
| **容器 vs 虛擬機** | 共享核心，更輕量，但隔離性較弱 |
| **儲存層** | 可寫層隨容器刪除而消失 |
| **資料持久化** | 使用 Volume 或 Bind Mount |
| **生命週期** | 與主程序 (PID 1) 繫結 |

理解了映象和容器，接下來讓我們學習[倉庫](2.3_repository.md)——儲存和分發映象的服務。

### 2.4.2 延伸閱讀

- [啟動容器](../05_container/5.1_run.md)：詳細的容器啟動選項
- [後台執行](../05_container/5.2_daemon.md)：理解容器為什麼會 『立即退出』
- [進入容器](../05_container/5.4_attach_exec.md)：如何操作執行中的容器
- [資料管理](../08_data/README.md)：Volume 和數據持久化詳解

| 概念 | 要點 |
|------|------|
| **Registry** | 儲存和分發映象的服務 |
| **倉庫 (Repository)** | 同一軟體的映象集合 |
| **標籤 (Tag)** | 版本標識，預設為 latest |
| **Docker Hub** | 預設的公共 Registry |
| **私有 Registry** | 企業內部使用，推薦 Harbor |

現在你已經瞭解了 Docker 的三個核心概念：[映象](2.1_image.md)、[容器](2.2_container.md)和倉庫。接下來，讓我們開始[安裝 Docker](../03_install/README.md)，動手實踐！

### 2.4.3 延伸閱讀

- [Docker Hub](../06_repository/6.1_dockerhub.md)：Docker Hub 的詳細使用
- [私有倉庫](../06_repository/6.2_registry.md)：搭建私有 Registry
- [私有倉庫高階設定](../06_repository/6.3_registry_auth.md)：認證、TLS 設定
- [映象加速器](../03_install/3.9_mirror.md)：設定映象加速
