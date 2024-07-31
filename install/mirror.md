# 映象加速器

國內從 Docker Hub 拉取映象有時會遇到困難，此時可以設定映象加速器。國內很多雲服務商都提供了國內加速器服務，例如：

* [阿里雲加速器(點選管理控制台 -> 登入賬號(淘寶賬號) -> 左側映象工具 -> 映象加速器 -> 複製加速器地址)](https://cr.console.aliyun.com/cn-hangzhou/instances)
* [網易雲加速器 `https://hub-mirror.c.163.com`](https://www.163yun.com/help/documents/56918246390157312)
* [百度雲加速器 `https://mirror.baidubce.com`](https://cloud.baidu.com/doc/CCE/s/Yjxppt74z#%E4%BD%BF%E7%94%A8dockerhub%E5%8A%A0%E9%80%9F%E5%99%A8)

**由於映象服務可能出現宕機，建議同時設定多個映象。各個映象站測試結果請到 [docker-practice/docker-registry-cn-mirror-test](https://github.com/docker-practice/docker-registry-cn-mirror-test/actions) 檢視。**

> 國內各大雲服務商（騰訊雲、阿里雲、百度雲）均提供了 Docker 映象加速服務，建議根據執行 Docker 的雲平台選擇對應的映象加速服務，具體請參考本頁最後一小節。

本節我們以 [網易雲](https://www.163yun.com/) 映象服務 `https://hub-mirror.c.163.com` 為例進行介紹。

## Ubuntu 16.04+、Debian 8+、CentOS 7+

目前主流 Linux 發行版均已使用 [systemd](https://systemd.io/) 進行服務管理，這裡介紹如何在使用 systemd 的 Linux 發行版中設定映象加速器。

請首先執行以下指令，檢視是否在 `docker.service` 檔案中設定過映象地址。

```bash
$ systemctl cat docker | grep '\-\-registry\-mirror'
```

如果該指令有輸出，那麼請執行 `$ systemctl cat docker` 檢視 `ExecStart=` 出現的位置，修改對應的檔案內容去掉 `--registry-mirror` 引數及其值，並按接下來的步驟進行設定。

如果以上指令沒有任何輸出，那麼就可以在 `/etc/docker/daemon.json` 中寫入如下內容（如果檔案不存在請新建該檔案）：

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

> 注意，一定要保證該檔案符合 json 規範，否則 Docker 將不能啟動。

之後重新啟動服務。

```bash
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
```

## Windows 10

對於使用 `Windows 10` 的使用者，在工具列托盤 Docker 圖示內右鍵選單選擇 `Settings`，開啟設定視窗後在左側導向選單選擇 `Docker Engine`，在右側像下邊一樣編輯 json 檔案，之後點選 `Apply & Restart` 儲存後 Docker 就會重啟並應用設定的映象地址了。

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

## macOS

對於使用 macOS 的使用者，在工具列點選 Docker Desktop 應用圖示 -> `Settings...`，在左側導向選單選擇 `Docker Engine`，在右側像下邊一樣編輯 json 檔案。修改完成之後，點選 `Apply & restart` 按鈕，Docker 就會重啟並應用設定的映象地址了。

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

## 檢查加速器是否生效

執行 `$ docker info`，如果從結果中看到瞭如下內容，說明設定成功。

```bash
Registry Mirrors:
 https://hub-mirror.c.163.com/
```

## `k8s.gcr.io` 映象

可以登入 [阿里雲 容器映象服務](https://www.aliyun.com/product/acr?source=5176.11533457&userCode=8lx5zmtu&type=copy) **映象中心** -> **映象搜尋** 查詢。

例如 `k8s.gcr.io/coredns:1.6.7` 映象可以用 `registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.7` 代替。

一般情況下有如下對應關係：

```bash
# $ docker pull k8s.gcr.io/xxx

$ docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/xxx
```

## 不再提供服務的映象

某些映象不再提供服務，新增無用的映象加速器，會拖慢映象拉取速度，你可以從映象設定清單中刪除它們。

* https://dockerhub.azk8s.cn **已轉為私有**
* https://reg-mirror.qiniu.com
* https://registry.docker-cn.com

建議 **watch（頁面右上角）** [映象測試](https://github.com/docker-practice/docker-registry-cn-mirror-test) 這個 GitHub 倉庫，我們會在此更新各個映象地址的狀態。

## 雲服務商

某些雲服務商提供了 **僅供內部** 訪問的映象服務，當您的 Docker 執行在雲平台時可以選擇它們。

* [Azure 中國映象 `https://dockerhub.azk8s.cn`](https://github.com/Azure/container-service-for-azure-china/blob/master/aks/README.md#22-container-registry-proxy)

* [騰訊雲 `https://mirror.ccs.tencentyun.com`](https://cloud.tencent.com/act/cps/redirect?redirect=10058&cps_key=3a5255852d5db99dcd5da4c72f05df61)
