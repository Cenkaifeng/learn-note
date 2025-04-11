#!/bin/bash

# MCP应用一键部署脚本
# 适用于Node.js v18+

echo "开始部署MCP应用..."

# 检查Node.js版本
NODE_VERSION=$(node -v)
NODE_VERSION_NUM=${NODE_VERSION:1}
REQUIRED_VERSION="18.0.0"

echo "检测到Node.js版本: $NODE_VERSION"

# 比较版本号
if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION_NUM" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "错误: 需要Node.js v18.0.0或更高版本"
    exit 1
fi

echo "Node.js版本检查通过"

# 安装依赖
echo "安装依赖..."
npm install

# 检查安装结果
if [ $? -ne 0 ]; then
    echo "错误: 依赖安装失败"
    exit 1
fi

echo "依赖安装成功"

# 创建必要的目录
mkdir -p logs

echo "MCP应用部署完成!"
echo "可以通过以下命令启动应用:"
echo "npm start"

# 询问是否立即启动应用
read -p "是否立即启动应用? (y/n): " START_APP

if [ "$START_APP" = "y" ] || [ "$START_APP" = "Y" ]; then
    echo "启动应用..."
    npm start
fi