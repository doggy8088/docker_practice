## 9.8 本章小結

本章介紹了 Docker 網路設定的各個方面：

| 概念 | 要點 |
|------|------|
| **DNS 設定** | 自定義網路支援嵌入式 DNS，可透過容器名解析 |
| **網路型別** | bridge (預設)、host、none、overlay、macvlan |
| **自定義網路** | 推薦使用，支援容器名 DNS 解析和更好的隔離 |
| **容器互聯** | 同一自定義網路內容器可直接透過容器名通訊 |
| **連接埠對映** | `-p 宿主機連接埠:容器連接埠` 暴露服務到外部 |
| **網路隔離** | 不同網路預設隔離，增強安全性 |
| **--link** | 已廢棄，使用自定義網路替代 |

### 9.8.1 延伸閱讀

- [設定 DNS](9.1_dns.md)：自定義 DNS 設定
- [網路型別](9.2_network_types.md)：Bridge、Host、None 等網路模式
- [自定義網路](9.3_custom_network.md)：建立和管理自定義網路
- [容器互聯](9.4_container_linking.md)：容器間通訊方式
- [連接埠對映](9.5_port_mapping.md)：高階連接埠設定
- [網路隔離](9.6_network_isolation.md)：網路安全與隔離策略
- [EXPOSE 指令](../07_dockerfile/7.9_expose.md)：在 Dockerfile 中宣告連接埠
- [Compose 網路](../11_compose/11.5_compose_file.md)：Compose 中的網路設定
