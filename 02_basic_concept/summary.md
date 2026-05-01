## 本章小結

本章介紹了 Docker 的三個核心概念：映象、容器和倉庫。

| 概念 | 要點 |
|------|------|
| **映象是什麼** | 只讀的應用樣板，包含執行所需的一切 |
| **分層儲存** | 多層疊加，共享基礎層，節省空間 |
| **只讀屬性** | 建立後不可修改，保證一致性 |
| **層的陷阱** | 刪除操作只是標記，不減小體積 |
| **容器是什麼** | 映象的執行實例，本質是隔離的程序 |
| **容器 vs 虛擬機** | 共享核心，更輕量，但隔離性較弱 |
| **儲存層** | 可寫層隨容器刪除而消失 |
| **資料持久化** | 使用 Volume 或 Bind Mount |
| **生命週期** | 與主程序 (PID 1) 繫結 |
| **Registry** | 儲存和分發映象的服務 |
| **倉庫 (Repository)** | 同一軟體的映象集合 |
| **標籤 (Tag)** | 版本標識，預設為 latest |
| **Docker Hub** | 預設的公共 Registry |
| **私有 Registry** | 企業內部使用，推薦 Harbor |

現在你已經瞭解了 Docker 的三個核心概念：[映象](2.1_image.md)、[容器](2.2_container.md) 和倉庫。接下來，讓我們開始 [安裝 Docker](../03_install/README.md)，動手實踐！
---

> 📝 **發現錯誤或有改進建議？** 歡迎送出 [Issue](https://github.com/yeasy/docker_practice/issues) 或 [PR](https://github.com/yeasy/docker_practice/pulls)。
