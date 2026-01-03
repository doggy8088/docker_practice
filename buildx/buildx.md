# 使用 Buildx 建立映象

## 使用

你可以直接使用 `docker buildx build` 指令建立映象。

```bash
$ docker buildx build .
[+] Building 8.4s (23/32)
 => ...
```

Buildx 使用 [BuildKit 引擎](buildkit.md) 進行建立，支援許多新的功能，具體參考 [Buildkit](buildkit.md) 一節。

## 官方文件

* https://docs.docker.com/engine/reference/commandline/buildx/
