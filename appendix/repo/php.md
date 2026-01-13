# [PHP](https://hub.docker.com/_/php/)

## 基本訊息

[PHP](https://en.wikipedia.org/wiki/Php)（Hypertext Preprocessor 超文字預處理器的字母縮寫）是一種被廣泛應用的開放原始碼的多用途指令碼語言，它可嵌入到 HTML 中，尤其適合 web 開發。

該倉庫位於 `https://hub.docker.com/_/php/` ，提供了 PHP 5.x ~ 8.x 各個版本的映象。

## 使用方法

下面的指令將執行一個已有的 PHP 指令碼。

```bash
$ docker run -it --rm -v "$PWD":/app -w /app php:alpine php your-script.php
```

## Dockerfile

請到 https://github.com/docker-library/docs/tree/master/php 檢視。
