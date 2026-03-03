# 前言

[![圖](https://img.shields.io/github/stars/yeasy/docker_practice.svg?style=social&label=Stars)](https://github.com/yeasy/docker_practice) [![圖](https://img.shields.io/github/release/yeasy/docker_practice/all.svg)](https://github.com/yeasy/docker_practice/releases) [![圖](https://img.shields.io/badge/Based-Docker%20Engine%20v29.x-blue.svg)](https://docs.docker.com/engine/release-notes/) [![圖](https://img.shields.io/badge/Docker%20%E6%8A%80%E6%9C%AF%E5%85%A5%E9%97%A8%E4%B8%8E%E5%AE%9E%E6%88%98-jd.com-red.svg)][1]

**v1.6.1**

[Docker](https://www.docker.com) 是個劃時代的開源專案，它徹底釋放了計算虛擬化的威力，極大提高了應用的維護效率，降低了雲端運算應用開發的成本！使用 Docker，可以讓應用的部署、測試和分發都變得前所未有的高效和輕鬆！

無論是應用開發者、運維人員、還是其他資訊科技從業人員，都有必要認識和掌握 Docker，節約有限的生命。

本書既適用於具備基礎 Linux 知識的 Docker 初學者，也希望可供理解原理和實現的高階使用者參考。同時，書中給出的實踐案例，可供在進行實際部署時借鑑。

## 內容特色

*   **入門基礎**：第 1 ~ 6 章為基礎內容，幫助深入理解 Docker 的基本概念 (映象、容器、倉庫) 和核心操作。
*   **進階應用**：第 7 ~ 11 章涵蓋 Dockerfile 指令詳解、資料與網路管理、Buildx、Compose 等高階設定和管理操作。
*   **深入原理**：第 12 ~ 17 章介紹其底層實現技術，深入探討容器編排體系 (Kubernetes、Etcd)，並延伸涉及容器與雲端運算及其它關鍵生態專案 (Fedora CoreOS、Podman 等)。
*   **實戰擴充套件**：第 18 ~ 21 章重點討論容器安全防護機制、監控與日誌聚合系統 (Prometheus、ELK)，並展示作業系統、CI/CD 自動化建立等典型實踐案例。

## 閱讀方式

本書按需提供多種閱讀模式，具體如下：

### 線上閱讀

*   **GitBook**: [yeasy.gitbook.io/docker_practice](https://yeasy.gitbook.io/docker_practice/)
*   **GitHub**: [github.com/yeasy/docker_practice](https://github.com/yeasy/docker_practice/blob/master/SUMMARY.md)
*   **Mirror**: [docker-practice.com](https://vuepress.mirror.docker-practice.com/)

### 本地閱讀

您也可以選擇以下方式在本地離線閱讀。

#### 方式 1：Docker 映象 (推薦)

無需安裝任何依賴，一條指令即可啟動。

```bash
docker run -it --rm -p 4000:80 ccr.ccs.tencentyun.com/dockerpracticesig/docker_practice:vuepress
```
啟動後訪問 [http://localhost:4000](http://localhost:4000)。
[詳情參考](https://github.com/yeasy/docker_practice/wiki/%E7%A6%BB%E7%BA%BF%E9%98%85%E8%AF%BB%E5%8A%9F%E8%83%BD%E8%AF%A6%E8%A7%A3)

#### 方式 2：本地建立

適合想要修改內容或深度定製的讀者。需要安裝 Node.js 環境。

```bash
npm install
npx honkit serve
```
啟動後訪問 [http://localhost:4000](http://localhost:4000)。

## 社群交流

歡迎加入 Docker 技術交流群，分享 Docker 資源，交流 Docker 技術。

*   **GitHub Discussions**：[點選前往](https://github.com/yeasy/docker_practice/discussions) (技術問答、交流)
*   **GitHub Issues**：[送出 Bug](https://github.com/yeasy/docker_practice/issues/new/choose) (內容錯誤、建議)

> **交流 QQ 群** (部分已滿，建議優先使用 GitHub Discussions)：
> *   341410255 (I), 419042067 (II), 210028779 (III), 483702734 (IV), 460598761 (V)
> *   581983671 (VI), 252403484 (VII), 544818750 (VIII), 571502246 (IX), 145983035 (X)

## 參與貢獻

歡迎[參與專案維護](CONTRIBUTING.md)。

*   [修訂記錄](CHANGELOG.md)
*   [貢獻者名單](https://github.com/yeasy/docker_practice/graphs/contributors)

## 進階學習

[![圖](https://github.com/yeasy/docker_practice/raw/master/_images/docker_primer4.jpg)][1]

《[Docker 技術入門與實戰][1]》已更新到第 4 版，講解最新容器技術棧知識，歡迎大家閱讀並反饋建議。

*   [京東圖書][1]
*   [天貓圖書](https://detail.tmall.com/item.htm?id=997383773726&skuId=6143496614475)

## 鼓勵專案

<p align="center">
<img width="200" src="https://github.com/yeasy/docker_practice/raw/master/_images/donate.jpeg">
</p>

<p align="center"><strong>歡迎鼓勵專案一杯 coffee~</strong></p>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yeasy/docker_practice&type=Date)](https://star-history.com/#yeasy/docker_practice&Date)

[1]: https://item.jd.com/10200902362001.html
