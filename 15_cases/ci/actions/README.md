# GitHub Actions

GitHub [Actions](https://github.com/features/actions) 是 GitHub 推出的一款 CI/CD 工具。

我們可以在每個 `job` 的 `step` 中使用 Docker 執行建立步驟。

```yaml
on: push

name: CI

jobs:
  my-job:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
        with:
          fetch-depth: 2
      - name: run docker container
        uses: docker://golang:alpine
        with:
          args: go version
```

## 概述

總體概述了以下內容。

## 參考資料

* [Actions Docs](https://docs.github.com/en/actions)
