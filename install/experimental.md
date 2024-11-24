# 開啟實驗屬性

一些 docker 指令或功能僅當 **實驗屬性** 開啟時才能使用，請按照以下方法進行設定。

## Docker CLI 的實驗屬性

從 `v20.10` 版本開始，Docker CLI 所有實驗屬性的指令均預設開啟，無需再進行設定或設定系統環境變數。

## 開啟 dockerd 的實驗屬性

編輯 `/etc/docker/daemon.json`，新增如下條目

```json
{
  "experimental": true
}
```
