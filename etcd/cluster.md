# etcd 叢集

下面我們使用 [Docker Compose](../compose/) 模擬啟動一個 3 節點的 `etcd` 叢集。

編輯 `docker-compose.yml` 檔案

```yaml
version: "3.6"
services:

  node1:
    image: quay.io/coreos/etcd:v3.4.0
    volumes:
      - node1-data:/etcd-data
    expose:
      - 2379
      - 2380
    networks:
      cluster_net:
        ipv4_address: 172.16.238.100
    environment:
      - ETCDCTL_API=3
    command:
      - /usr/local/bin/etcd
      - --data-dir=/etcd-data
      - --name
      - node1
      - --initial-advertise-peer-urls
      - http://172.16.238.100:2380
      - --listen-peer-urls
      - http://0.0.0.0:2380
      - --advertise-client-urls
      - http://172.16.238.100:2379
      - --listen-client-urls
      - http://0.0.0.0:2379
      - --initial-cluster
      - node1=http://172.16.238.100:2380,node2=http://172.16.238.101:2380,node3=http://172.16.238.102:2380
      - --initial-cluster-state
      - new
      - --initial-cluster-token
      - docker-etcd

  node2:
    image: quay.io/coreos/etcd:v3.4.0
    volumes:
      - node2-data:/etcd-data
    networks:
      cluster_net:
        ipv4_address: 172.16.238.101
    environment:
      - ETCDCTL_API=3
    expose:
      - 2379
      - 2380
    command:
      - /usr/local/bin/etcd
      - --data-dir=/etcd-data
      - --name
      - node2
      - --initial-advertise-peer-urls
      - http://172.16.238.101:2380
      - --listen-peer-urls
      - http://0.0.0.0:2380
      - --advertise-client-urls
      - http://172.16.238.101:2379
      - --listen-client-urls
      - http://0.0.0.0:2379
      - --initial-cluster
      - node1=http://172.16.238.100:2380,node2=http://172.16.238.101:2380,node3=http://172.16.238.102:2380
      - --initial-cluster-state
      - new
      - --initial-cluster-token
      - docker-etcd

  node3:
    image: quay.io/coreos/etcd:v3.4.0
    volumes:
      - node3-data:/etcd-data
    networks:
      cluster_net:
        ipv4_address: 172.16.238.102
    environment:
      - ETCDCTL_API=3
    expose:
      - 2379
      - 2380
    command:
      - /usr/local/bin/etcd
      - --data-dir=/etcd-data
      - --name
      - node3
      - --initial-advertise-peer-urls
      - http://172.16.238.102:2380
      - --listen-peer-urls
      - http://0.0.0.0:2380
      - --advertise-client-urls
      - http://172.16.238.102:2379
      - --listen-client-urls
      - http://0.0.0.0:2379
      - --initial-cluster
      - node1=http://172.16.238.100:2380,node2=http://172.16.238.101:2380,node3=http://172.16.238.102:2380
      - --initial-cluster-state
      - new
      - --initial-cluster-token
      - docker-etcd

volumes:
  node1-data:
  node2-data:
  node3-data:

networks:
  cluster_net:
    driver: bridge
    ipam:
      driver: default
      config:
      -
        subnet: 172.16.238.0/24
```

使用 `docker-compose up` 啟動叢集之後使用 `docker exec` 指令登入到任一節點測試 `etcd` 叢集。

```bash
/ # etcdctl member list
daf3fd52e3583ff, started, node3, http://172.16.238.102:2380, http://172.16.238.102:2379
422a74f03b622fef, started, node1, http://172.16.238.100:2380, http://172.16.238.100:2379
ed635d2a2dbef43d, started, node2, http://172.16.238.101:2380, http://172.16.238.101:2379
```
