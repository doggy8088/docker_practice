# podman

[`podman`](https://github.com/containers/podman) 是一個無守護程式與 docker 指令相容的下一代 Linux 容器工具。

## 安裝

```bash
$ sudo yum -y install podman
```

## 使用

`podman` 與 docker 指令完全相容，只需將 `docker` 替換為 `podman` 即可，例如執行一個容器：

```bash
# $ docker run -d -p 80:80 nginx:alpine

$ podman run -d -p 80:80 nginx:alpine
```

## 參考

* https://developers.redhat.com/blog/2019/02/21/podman-and-buildah-for-docker-users/
