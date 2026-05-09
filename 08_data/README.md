# 第八章 資料管理

如圖 8-1 所示，Docker 資料管理主要圍繞三類掛載方式展開。

<p align="center">
  <img src="./_images/types-of-mounts.png" alt="Docker 資料掛載型別">
</p>

圖 8-1：Docker 資料掛載型別示意圖

這一章介紹如何在 Docker 內部以及容器之間管理資料，在容器中管理資料主要有以下幾種方式：

* [資料卷](8.1_volume.md)
* [掛載主機目錄](8.2_bind-mounts.md)
* [tmpfs 掛載](8.3_tmpfs.md)
