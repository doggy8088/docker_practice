# 第四章 使用映象

在之前的介紹中，我們知道映象是 Docker 的三大元件之一。

Docker 執行容器前需要本地存在對應的映象，如果本地不存在該映象，Docker 會從映象倉庫下載該映象。

## 本章內容

本章將介紹更多關於映象的內容，包括：

* [從倉庫獲取映象](4.1_pull.md)
* [列出映象](4.2_list.md)
* [刪除本地映象](4.3_rm.md)
* [利用 commit 理解映象構成](4.4_commit.md)
* [使用 Dockerfile 定製映象](4.5_build.md)
* [其它製作映象的方式](4.6_other.md)
* [映象的實現原理](4.7_internal.md)

> **版本提示：映象儲存後端的變遷**
>
> 在 Docker Engine v29 及後續版本中，Docker 在**全新安裝場景**預設啟用 **containerd image store**（替代傳統 classic store 路徑）。這一底層架構級別的變遷，意味著 Docker 解鎖了對 OCI Image Index 和 Attestations（例如原生的 provenance 來源證明與 SBOM 軟體物料清單）的全量本地支援。
> 讀者在執行類似 `docker buildx build --provenance=mode=min --sbom=true` 甚至使用後續審查工具（如 `docker buildx imagetools inspect`）時，其元資料能夠與映象資料一併完好地管理於本地儲存系統中，為供應鏈安全驗證補齊了最後一塊拼圖。
