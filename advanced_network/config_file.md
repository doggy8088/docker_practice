# 編輯網路設定檔案

Docker 1.2.0 開始支援在執行中的容器裡編輯 `/etc/hosts`, `/etc/hostname` 和 `/etc/resolv.conf` 檔案。

但是這些修改是臨時的，只在執行的容器中保留，容器終止或重啟後並不會被儲存下來，也不會被 `docker commit` 送出。
