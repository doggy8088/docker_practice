# 第三章 安裝 Docker

Docker 分為 `stable` `test` 和 `nightly` 三個更新頻道。

官方網站上有各種環境下的[安裝指南](https://docs.docker.com/get-docker/)，這裡主要介紹 Docker 在 `Linux`、`Windows 10` 和 `macOS` 上的安裝。

## 安裝方式選擇指南

在開始安裝前，筆者建議你根據以下決策樹選擇最合適的安裝方式：

### 生產環境 vs 開發環境

**生產環境**（伺服器部署）：
- 優先使用**官方 APT/YUM 源安裝**（Ubuntu、Debian、Fedora、CentOS）
- 優勢：獲得官方安全更新、長期技術支援、版本管理清晰
- 安裝步驟稍多一些，但這種『麻煩』是值得的——它為你的生產系統爭取了穩定性和可維護性

**開發環境**（本地開發機、測試伺服器）：
- 使用**指令碼自動安裝**或**套件管理器直接安裝**
- 如果你想快速上手，官方指令碼（`get.docker.com`）是最便捷的選擇
- 國內使用者注意：這一步一定要選對映象源，否則網絡卡頓會嚴重影響體驗

### 國內使用者的網路最佳化建議

值得注意的是，國內直接訪問 Docker 官方源速度較慢，建議：
- **安裝過程**：使用阿里雲、騰訊雲等國內映象源
- **映象拉取**：安裝完成後設定 Docker 映象加速器（詳見 [3.9 映象加速器](3.9_mirror.md)），這一步對日常開發的體驗提升最明顯

### 特殊場景

- **Raspberry Pi/ARM 平台**：見 [3.5 Raspberry Pi](3.5_raspberry-pi.md)
- **離線環境**：見 [3.6 Linux 離線安裝](3.6_offline.md)
- **macOS/Windows**：Docker Desktop 是官方推薦的一站式解決方案
- **需要實驗屬性**：見 [3.10 開啟實驗屬性](3.10_experimental.md)

## 詳細安裝指南

* [Ubuntu](3.1_ubuntu.md)
* [Debian](3.2_debian.md)
* [Fedora](3.3_fedora.md)
* [CentOS](3.4_centos.md)
* [Raspberry Pi](3.5_raspberry-pi.md)
* [Linux 離線安裝](3.6_offline.md)
* [macOS](3.7_mac.md)
* [Windows 10/11](3.8_windows.md)
* [映象加速器](3.9_mirror.md)
* [開啟實驗屬性](3.10_experimental.md)
