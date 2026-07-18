# 第十章 Docker Buildx

Docker Buildx 是一個 docker CLI 外掛，其擴充套件了 docker 指令，支援 [Moby BuildKit](10.1_buildkit.md) 提供的功能。提供了與 docker build 相同的使用者體驗，並增加了許多新功能。

> Buildx 需要 Docker v23.0+（該版本起 BuildKit 成為預設建立引擎）。推薦使用 Docker v28 及以上版本以獲得最完整的 Buildx 功能支援。

## 本章內容

本章將詳細介紹 Docker Buildx 的使用，包括：

* [使用 BuildKit 建立映象](10.1_buildkit.md)
* [使用 Buildx 建立映象](10.2_buildx.md)
* [建立多種系統架構支援的 Docker 映象](10.3_multi-arch-images.md)

> **供應鏈安全與儲存後端前瞻**：現代軟體供應鏈中，映象來源證明（Provenance，在 BuildKit 中預設以 `mode=min` 新增）和軟體物料清單（SBOM，可透過 `--sbom=true` 顯式開啟）已經成為極其重要的建立產出。這些 Attestations 資料會作為 manifest 附著在 **映象索引 (Image Index)** 上。
> 正是基於此訴求，自 Docker Engine 29 起在**新安裝場景**預設啟用的 `containerd image store` 提供對 Image Index 的完美本地支援能力，解決了傳統經典儲存後端（Classic Store）無法有效處理帶 Attestations 映象索引的瓶頸。這使得你可以利用 `docker buildx imagetools inspect` 等手段，甚至做到無需拉取完整映象內容即可在 Registry 或本地高效校驗映象的安全元資料。
