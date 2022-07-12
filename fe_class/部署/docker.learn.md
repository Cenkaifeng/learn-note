
# Docker & k8s learn-note

### docker
类似 VM Work station 但是又有些不相似的地方

镜像：IOS 文件
容器：正在运行的虚拟机
tar: 类似VM 用的 vmdk 文件。可以将镜像保存成 tar 文件
dockerfile: docker 的配置文件，可以用 build 指令将配置构建成一个镜像

#### docker 命令

操作环境：https://labs.play-with-docker.com/


![docker命令结构](./docker%E5%91%BD%E4%BB%A4%E7%BB%93%E6%9E%84.png);
docker pull nginx 
等效于
docker pull nginx:latest

docker images 查看镜像

docker run -d -p 80:80 nginx 运行内外映射端口 
  -d || -dit-> 后台运行
  -p port:port -> 指定端口映射
  (左边是外部，右边是内部镜像端口)
  --name 指定容器运行名字
  -v 映射文件 .eg -v `pwd`:/usr/share/nginx/html 将当前目录映射到 html 指定映射目录
  --link 可以将其他容器与本容器映射
  

docker exec -it [id || name] bash 进入镜像/容器的bash 
xx 指镜像哈希前两位

`docker save [name] > filename.tar`
`docker load name < xxx.tar`

`docker images` 查看加载的镜像
`docker ps` 查看当前加载的容器有哪些
`docker stop [name]` 停止容器

### dockerfile
最常用的五个参数和其他

`FROM`：基于xxx镜像
`WORKDIR`：指定接下来 shell 语句运行的目录
`COPY`：将当前宿主机的文件拷贝到镜像中去 类似`ADD`
`RUN`：运行 shell 语句
`CMD`：指定整个镜像运行的脚本，一般到这个命令也代表运行Dockerfile文件的周期进入结尾，所以都会用阻塞式脚本 .eg `tail -f xx.txt` 这类
`ENTRYPOINT`
---
`EXPOSE` 指定导出端口
`VOLUME` 指定映射文件 （一般映射匿名卷）
---
`ENV` V=10 指定环境变量 可以 CMD echo $V 取出 也可以 V=$B 赋值
`ARG` B=1 全局变量，构建时生效（可以通过docker build -t xxx --build-arg B=1 来起到构建时临时修改内部变量的效果）
---
`LABEL` k="v" k1="k" 用于看镜像表示，没有实际作用
`ONBUILD` 另一个镜像基于当前镜像创建来执行脚本，执行位置在另一个镜像FROM后

STOPSIGNAL 指定容器停止的信号
HEALTHCHECK 容器健康检查配置
SHELL /bin/sh 容器默认脚本
**ENTRYPOINT & CMD**

ENTRYPOINT 如果非 json 则以 ENTRYPOINT 为准，如果 ENTRYPOINT 和 CMD 都是 json 则 ENTRYPOINT + CMD 拼成 shell 

ENTRYPOINT 指令可以在run的时候最佳参数
### 实际工程中的docker分配


### docker-compose 
#### 做了什么？
让容器间更好通信，不用每个容器单独link

#### 如何使用？

.yml 格式来配置 lnmp 的文件
```yml
version: "3"
services:
  nginx:
    image: nginx:alpine
    ports:
    - 80:80
    volumes:
    - /root/html:/usr/share/nginx/html
    - /root/conf/nginx.conf:/etc/nginx/nginx.conf
  php:
    image: devilbox/php-fpm:5.2-work-0.89 # php 原始版本缺少部分配置
    volume:
    - /root/html:/var/www/html
  mysql:
    image: mysql:5.6
    - MYSQL_ROOT_PASSWORD=123456 # 这里看具体数据库的密码
```


### k8s: kubernetes
容器编排工具
https://labs.play-with-k8s.com/

#### 结构
master
  ETCP: 数据库，用于存取节点信息元数据信息
  apiserver
    kubectl
    RestAPI
    WebUI
  controller-manager
  scheduler


node || worker
  kubelet
  kube-proxy
  docker

pod k8s 对容器调度单位的最小封装
  docker + pause（pause 也是个很小的容器）

> pod 其实可以有多个 docker 容器，但是大多数时候是一个应用容器 + 一个 pause

deployment 维持 pod 数量 
最终是以docker 的方式在 node 节点上启动的

```bash
kubectl cluster-info # 查看集群信息

kubectl get pod # get 获取资源信息

kubectl run [deployment name] --image httpd:alpine --port 80 # 起一个 deployment

```
#### service
service 将多个 pod 抽象为一个服务

kube-proxy 会对不同 node 的 pod 抽象出一个虚拟交换机对服务实例分发

```bash
kubectl expose deployment [deployment_name] --target-port 80 --type NodePort

```
#### k8s service 之间如何通信？

1. ip 通信
2. dns 服务，将 ip 和service 名字做域名解析

#### ingress 将虚拟ip 对应到公网ip

ingress 将域名解析到 service -> ip 