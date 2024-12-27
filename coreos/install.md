# 安裝 Fedora CoreOS

## 下載 ISO

在 [下載頁面](https://getfedora.org/coreos/download/) `Bare Metal & Virtualized` 標籤頁下載 ISO。

## 編寫 FCC

FCC 是 Fedora CoreOS Configuration （Fedora CoreOS 設定）的簡稱。

```yaml
# example.fcc
variant: fcos
version: 1.0.0
passwd:
  users:
    - name: core
      ssh_authorized_keys:
        - ssh-rsa AAAA...
```

將 `ssh-rsa AAAA...` 替換為自己的 SSH 公鑰（位於 `~/.ssh/id_rsa.pub`）。

## 轉換 FCC 為 Ignition

```bash
$ docker run -i --rm quay.io/coreos/fcct:v0.5.0 --pretty --strict < example.fcc > example.ign
```

## 掛載 ISO 啟動虛擬機並安裝

> 虛擬機需要分配 3GB 以上記憶體，否則會無法啟動。

在虛擬機終端執行以下指令安裝：

```bash
$ sudo coreos-installer install /dev/sda --ignition-file example.ign
```

安裝之後重新啟動即可使用。

## 使用

```bash
$ ssh core@虛擬機IP

$ docker --version
```

## 參考連結

* [官方文件](https://docs.fedoraproject.org/en-US/fedora-coreos/bare-metal/)
