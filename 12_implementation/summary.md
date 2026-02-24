## 12.7 本章小結

相關訊息如下表：

| Namespace | 隔離內容 | 一句話說明 |
|-----------|---------|-----------|
| PID | 程序 ID | 容器有自己的程序樹 |
| NET | 網路 | 容器有自己的 IP 和連接埠 |
| MNT | 檔案系統 | 容器有自己的根目錄 |
| UTS | 主機名 | 容器有自己的 hostname |
| IPC | 程序間通訊 | 容器間 IPC 隔離 |
| USER | 使用者 ID | 容器 root ≠ 宿主機 root |

### 12.7.1 延伸閱讀

- [控制組 (Cgroups)](12.3_cgroups.md)：資源限制機制
- [聯合檔案系統](12.4_ufs.md)：分層儲存的實現
- [安全](../18_security/README.md)：容器安全實踐
- [Linux Namespace 官方文件](https://man7.org/linux/man-pages/man7/namespaces.7.html)

| 資源 | 限制引數 | 範例 |
|------|---------|------|
| **記憶體** | `-m` | `-m 512m` |
| **CPU 核心數** | `--cpus` | `--cpus=1.5` |
| **CPU 繫結** | `--cpuset-cpus` | `--cpuset-cpus="0,1"` |
| **磁碟 I/O** | `--device-write-bps` | `--device-write-bps /dev/sda:10mb` |
| **程序數** | `--pids-limit` | `--pids-limit=100` |

### 12.7.2 延伸閱讀

- [命名空間](12.2_namespace.md)：資源隔離
- [安全](../18_security/README.md)：容器安全概述
- [Docker Stats](../05_container/README.md)：監控容器資源

| 概念 | 說明 |
|------|------|
| **UnionFS** | 將多層目錄聯合掛載為一個檔案系統 |
| **Copy-on-Write** | 寫時複製，修改時才複製到可寫層 |
| **overlay2** | Docker 預設推薦的儲存驅動 |
| **分層好處** | 映象複用、快速建立、快速啟動 |

### 12.7.3 延伸閱讀

- [映象](../02_basic_concept/2.1_image.md)：理解映象分層
- [容器](../02_basic_concept/2.2_container.md)：容器儲存層
- [建立映象](../04_image/4.5_build.md)：Dockerfile 層的建立
