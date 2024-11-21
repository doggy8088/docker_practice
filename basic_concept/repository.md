# Docker Registry

映象建立完成後，可以很容易的在當前宿主機上執行，但是，如果需要在其它伺服器上使用這個映象，我們就需要一個集中的儲存、分發映象的服務，[Docker Registry](../repository/registry.md) 就是這樣的服務。

一個 **Docker Registry** 中可以包含多個 **倉庫**（`Repository`）；每個倉庫可以包含多個 **標籤**（`Tag`）；每個標籤對應一個映象。

通常，一個倉庫會包含同一個軟體不同版本的映象，而標籤就常用於對應該軟體的各個版本。我們可以透過 `<倉庫名>:<標籤>` 的格式來指定具體是這個軟體哪個版本的映象。如果不給出標籤，將以 `latest` 作為預設標籤。

以 [Ubuntu 映象](https://hub.docker.com/_/ubuntu) 為例，`ubuntu` 是倉庫的名字，其內包含有不同的版本標籤，如，`16.04`, `18.04`。我們可以透過 `ubuntu:16.04`，或者 `ubuntu:18.04` 來具體指定所需哪個版本的映象。如果忽略了標籤，比如 `ubuntu`，那將視為 `ubuntu:latest`。

倉庫名經常以 *兩段式路徑* 形式出現，比如 `jwilder/nginx-proxy`，前者往往意味著 Docker Registry 多使用者環境下的使用者名，後者則往往是對應的軟體名。但這並非絕對，取決於所使用的具體 Docker Registry 的軟體或服務。

## Docker Registry 公開服務

Docker Registry 公開服務是開放給使用者使用、允許使用者管理映象的 Registry 服務。一般這類公開服務允許使用者免費上傳、下載公開的映象，並可能提供收費服務供使用者管理私有映象。

最常使用的 Registry 公開服務是官方的 [Docker Hub](https://hub.docker.com/)，這也是預設的 Registry，並擁有大量的高質量的 [官方映象](https://hub.docker.com/search?q=&type=image&image_filter=official)。除此以外，還有 Red Hat 的 [Quay.io](https://quay.io/repository/)；Google 的 [Google Container Registry](https://cloud.google.com/container-registry/)，[Kubernetes](https://kubernetes.io/) 的映象使用的就是這個服務；程式碼託管平台 [GitHub](https://github.com) 推出的 [ghcr.io](https://docs.github.com/cn/packages/working-with-a-github-packages-registry/working-with-the-container-registry)。

由於某些原因，在國內訪問這些服務可能會比較慢。國內的一些雲服務商提供了針對 Docker Hub 的映象服務（`Registry Mirror`），這些映象服務被稱為 **加速器**。常見的有 [阿里雲加速器](https://www.aliyun.com/product/acr?source=5176.11533457&userCode=8lx5zmtu)、[DaoCloud 加速器](https://www.daocloud.io/mirror#accelerator-doc) 等。使用加速器會直接從國內的地址下載 Docker Hub 的映象，比直接從 Docker Hub 下載速度會提高很多。在 [安裝 Docker](../install/mirror.md)  一節中有詳細的設定方法。

國內也有一些雲服務商提供類似於 Docker Hub 的公開服務。比如 [網易雲映象服務](https://c.163.com/hub#/m/library/)、[DaoCloud 映象市場](https://hub.daocloud.io/)、[阿里雲映象函式庫](https://www.aliyun.com/product/acr?source=5176.11533457&userCode=8lx5zmtu) 等。

## 私有 Docker Registry

除了使用公開服務外，使用者還可以在本地搭建私有 Docker Registry。Docker 官方提供了 [Docker Registry](https://hub.docker.com/_/registry/) 映象，可以直接使用做為私有 Registry 服務。在 [私有倉庫](../repository/registry.md) 一節中，會有進一步的搭建私有 Registry 服務的講解。

開源的 Docker Registry 映象只提供了 [Docker Registry API](https://docs.docker.com/registry/spec/api/) 的伺服器端實現，足以支援 `docker` 指令，不影響使用。但不包含圖形界面，以及映象維護、使用者管理、訪問控制等高階功能。

除了官方的 Docker Registry 外，還有第三方軟體實現了 Docker Registry API，甚至提供了使用者介面以及一些高階功能。比如，[Harbor](https://github.com/goharbor/harbor) 和 [Sonatype Nexus](../repository/nexus3_registry.md)。
