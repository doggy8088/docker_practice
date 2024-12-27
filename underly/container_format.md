# 容器格式

最初，Docker 採用了 `LXC` 中的容器格式。從 0.7 版本以後開始去除 LXC，轉而使用自行開發的 [libcontainer](https://github.com/docker/libcontainer)，從 1.11 開始，則進一步演進為使用 [runC](https://github.com/opencontainers/runc) 和 [containerd](https://github.com/containerd/containerd)。
