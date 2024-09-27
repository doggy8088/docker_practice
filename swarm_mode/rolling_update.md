# SWarm mode 與捲動升級

在 [部署服務](deploy.md) 一節中我們使用 `nginx:1.13.7-alpine` 映象部署了一個名為 `nginx` 的服務。

現在我們想要將 `NGINX` 版本升級到 `1.13.12`，那麼在 Swarm mode 中如何升級服務呢？

你可能會想到，先停止原來的服務，再使用新映象部署一個服務，不就完成服務的 『升級』 了嗎。

這樣做的弊端很明顯，如果新部署的服務出現問題，原來的服務刪除之後，很難恢復，那麼在 Swarm mode 中到底該如何對服務進行捲動升級呢？

答案就是使用 `docker service update` 指令。

```bash
$ docker service update \
    --image nginx:1.13.12-alpine \
    nginx
```

以上指令使用 `--image` 選項更新了服務的映象。當然我們也可以使用 `docker service update` 更新任意的設定。

`--secret-add` 選項可以增加一個金鑰

`--secret-rm` 選項可以刪除一個金鑰

更多選項可以透過 `docker service update -h` 指令檢視。

## 服務回退

現在假設我們發現 `nginx` 服務的映象升級到 `nginx:1.13.12-alpine` 出現了一些問題，我們可以使用指令一鍵回退。

```bash
$ docker service rollback nginx
```

現在使用 `docker service ps` 指令檢視 `nginx` 服務詳情。

```bash
$ docker service ps nginx

ID                  NAME                IMAGE                  NODE                DESIRED STATE       CURRENT STATE                ERROR               PORTS
rt677gop9d4x        nginx.1             nginx:1.13.7-alpine   VM-20-83-debian     Running             Running about a minute ago
d9pw13v59d00         \_ nginx.1         nginx:1.13.12-alpine  VM-20-83-debian     Shutdown            Shutdown 2 minutes ago
i7ynkbg6ybq5         \_ nginx.1         nginx:1.13.7-alpine   VM-20-83-debian     Shutdown            Shutdown 2 minutes ago
```

結果的輸出詳細記錄了服務的部署、捲動升級、回退的過程。
