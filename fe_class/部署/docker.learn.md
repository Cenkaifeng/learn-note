
# Docker learn-note

类似 VM Work station 但是又有些不相似的地方

镜像：IOS 文件
容器：正在运行的虚拟机
tar: 类似VM 用的 vmdk 文件。可以将镜像保存成 tar 文件
dockerfile: docker 的配置文件，可以用 build 指令将配置构建成一个镜像

### docker 命令

操作环境：https://labs.play-with-docker.com/


docker pull nginx 
等效于
docker pull nginx:latest

docker images 查看镜像

docker run -d -p 80:80 nginx 运行内外映射端口

docker exec -it xx bash 进入镜像的bash 
xx 指镜像哈希前两位  