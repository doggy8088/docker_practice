## 本章小結

Docker 的安全性依賴於多層隔離機制的協同工作，同時需要使用者遵循最佳實踐。本章涵蓋的核心安全維度包括：

| 維度 | 關鍵措施 |
|------|---------|
| **核心隔離** | Namespace 隔離程序/網路/檔案系統，Cgroups 限制資源使用 |
| **許可權控制** | 非 root 執行、`--cap-drop ALL` 最小能力集、`--read-only` 只讀根檔案系統 |
| **映象安全** | 使用可信基礎映象、定期掃描漏洞（Trivy / Snyk）、啟用 Docker Content Trust 簽名驗證 |
| **執行時防護** | Seccomp 系統呼叫過濾、AppArmor / SELinux 強制訪問控制 |
| **網路隔離** | 自定義 bridge 網路隔離容器通訊、限制容器對宿主機網路的訪問 |

總體來看，Docker 容器還是十分安全的，特別是在容器內不使用 root 許可權來執行程序的話。

另外，使用者可以使用現有工具，比如 [Apparmor](https://docs.docker.com/engine/security/apparmor/)，[Seccomp](https://docs.docker.com/engine/security/seccomp/)，SELinux，GRSEC 來增強安全性；甚至自己在核心中實現更復雜的安全機制。
---

> 📝 **發現錯誤或有改進建議？** 歡迎送出 [Issue](https://github.com/doggy8088/docker_practice/issues) 或 [PR](https://github.com/doggy8088/docker_practice/pulls)。
