## 本章小結

本章深入介紹了 Docker 的底層實現，包括命名空間、控制組和聯合檔案系統三大核心技術。

| 技術 | 作用 | 要點 |
|------|------|------|
| **Namespace** | 資源隔離 | PID、NET、MNT、UTS、IPC、USER 六種命名空間 |
| **Cgroups** | 資源限制 | 限制 CPU、記憶體、磁碟 I/O、程序數 |
| **Union FS** | 分層儲存 | overlay2 為推薦驅動，支援 Copy-on-Write |

| Namespace | 隔離內容 | 一句話說明 |
|-----------|---------|-----------| 
| PID | 程序 ID | 容器有自己的程序樹 |
| NET | 網路 | 容器有自己的 IP 和連接埠 |
| MNT | 檔案系統 | 容器有自己的根目錄 |
| UTS | 主機名 | 容器有自己的 hostname |
| IPC | 程序間通訊 | 容器間 IPC 隔離 |
| USER | 使用者 ID | 容器 root ≠ 宿主機 root |

| 資源 | 限制引數 | 範例 |
|------|---------|------|
| **記憶體** | `-m` | `-m 512m` |
| **CPU 核心數** | `--cpus` | `--cpus=1.5` |
| **CPU 繫結** | `--cpuset-cpus` | `--cpuset-cpus="0,1"` |
| **磁碟 I/O** | `--device-write-bps` | `--device-write-bps /dev/sda:10mb` |
| **程序數** | `--pids-limit` | `--pids-limit=100` |

### 延伸閱讀

- [命名空間](12.2_namespace.md)：資源隔離機制詳解
- [控制組 (Cgroups)](12.3_cgroups.md)：資源限制機制
- [聯合檔案系統](12.4_ufs.md)：分層儲存的實現
- [安全](../18_security/README.md)：容器安全實踐
- [映象](../02_basic_concept/2.1_image.md)：理解映象分層
- [容器](../02_basic_concept/2.2_container.md)：容器儲存層
- [建立映象](../04_image/4.5_build.md)：Dockerfile 層的建立
