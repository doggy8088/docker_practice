# 聯合檔案系統

聯合檔案系統（[UnionFS](https://en.wikipedia.org/wiki/UnionFS)）是一種分層、輕量級並且高效能的檔案系統，它支援對檔案系統的修改作為一次送出來一層層的疊加，同時可以將不同目錄掛載到同一個虛擬檔案系統下(unite several directories into a single virtual filesystem)。

聯合檔案系統是 Docker 映象的基礎。映象可以透過分層來進行繼承，基於基礎映象（沒有父映象），可以製作各種具體的應用映象。

另外，不同 Docker 容器就可以共享一些基礎的檔案系統層，同時再加上自己獨有的改動層，大大提高了儲存的效率。

Docker 中使用的 AUFS（Advanced Multi-Layered Unification Filesystem）就是一種聯合檔案系統。 `AUFS` 支援為每一個成員目錄（類似 Git 的分支）設定只讀（readonly）、讀寫（readwrite）和寫出（whiteout-able）許可權, 同時 `AUFS` 裡有一個類似分層的概念, 對只讀許可權的分支可以邏輯上進行增量地修改(不影響只讀部分的)。

Docker 目前支援的聯合檔案系統包括 `OverlayFS`, `AUFS`, `Btrfs`, `VFS`, `ZFS` 和 `Device Mapper`。

各 Linux 發行版 Docker 推薦使用的儲存驅動如下表。

|Linux 發行版 |	Docker 推薦使用的儲存驅動 |
| :--        | :--                     |
|Docker on Ubuntu |	`overlay2` (16.04 +) |
|Docker on Debian |	`overlay2` (Debian Stretch), `aufs`, `devicemapper` |
|Docker on CentOS |	`overlay2`  |
|Docker on Fedora |	`overlay2`  |

在可能的情況下，[推薦](https://docs.docker.com/storage/storagedriver/select-storage-driver/) 使用 `overlay2` 儲存驅動，`overlay2` 是目前 Docker 預設的儲存驅動，以前則是 `aufs`。你可以透過設定來使用以上提到的其他型別的儲存驅動。
