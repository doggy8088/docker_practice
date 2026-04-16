## 本章小結

本章介紹了 Docker 映象的獲取、列出、刪除以及建立方式。

| 操作 | 指令 |
|------|------|
| 拉取映象 | `docker pull 映象名:標籤` |
| 拉取所有標籤 | `docker pull -a 映象名` |
| 指定平台 | `docker pull --platform linux/amd64 映象名` |
| 用摘要拉取 | `docker pull 映象名@sha256:...` |
| 列出所有映象 | `docker images` |
| 按倉庫名過濾 | `docker images nginx` |
| 列出虛懸映象 | `docker images -f dangling=true` |
| 只輸出 ID | `docker images -q` |
| 顯示摘要 | `docker images --digests` |
| 自定義格式 | `docker images --format "..."` |
| 檢視空間佔用 | `docker system df` |
| 刪除指定映象 | `docker rmi 映象名:標籤` |
| 強制刪除 | `docker rmi -f 映象名` |
| 刪除虛懸映象 | `docker image prune` |
| 刪除未使用映象 | `docker image prune -a` |
| 批次刪除 | `docker rmi $(docker images -q -f ...)` |

### 延伸閱讀

- [獲取映象](4.1_pull.md)：從 Registry 拉取映象
- [列出映象](4.2_list.md)：檢視和過濾映象
- [刪除映象](4.3_rm.md)：清理本地映象
- [映象加速器](../03_install/3.9_mirror.md)：加速映象下載
- [Docker Hub](../06_repository/6.1_dockerhub.md)：官方映象倉庫
- [映象](../02_basic_concept/2.1_image.md)：理解映象概念
- [刪除容器](../05_container/5.6_rm.md)：清理容器
- [資料卷](../08_data/8.1_volume.md)：清理資料卷
---

> 📝 **發現錯誤或有改進建議？** 歡迎送出 [Issue](https://github.com/yeasy/docker_practice/issues) 或 [PR](https://github.com/yeasy/docker_practice/pulls)。
