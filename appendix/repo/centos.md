# [CentOS](https://hub.docker.com/_/centos)

## 基本訊息

[CentOS](https://en.wikipedia.org/wiki/CentOS) 是流行的 Linux 發行版，其軟體套件大多跟 RedHat 系列保持一致。

> ⚠️ **重要提示**：CentOS 8 已於 2021 年 12 月 31 日停止維護（EOL），CentOS 7 將於 2024 年 6 月 30 日結束支援。Docker Hub 上的 CentOS 官方映象**已停止更新**。
>
> 對於新專案，建議使用以下替代方案：
> - [Rocky Linux](https://hub.docker.com/_/rockylinux)：CentOS 創始人發起的社群驅動專案
> - [AlmaLinux](https://hub.docker.com/_/almalinux)：由 CloudLinux 支援的企業級發行版
> - [CentOS Stream](https://hub.docker.com/r/centos/centos)：RHEL 的上游開發分支

該倉庫位於 `https://hub.docker.com/_/centos`，提供了 CentOS 從 5 ~ 8 各個版本的映象（僅供參考，不再更新）。

## 使用方法

使用 Rocky Linux 替代（推薦）：

```bash
$ docker run --name rocky -it rockylinux:9 bash
```

使用舊版 CentOS 7（僅用於遺留系統）：

```bash
$ docker run --name centos -it centos:7 bash
```

## Dockerfile

請到 https://github.com/docker-library/docs/tree/master/centos 檢視。
