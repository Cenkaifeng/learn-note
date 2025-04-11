# MCP应用

基于Node.js v18+的MCP应用，提供获取系统时间和修改本地Markdown文件的功能。

## 功能特点

- **获取系统时间**: 通过`get_time()`函数获取当前系统时间，格式为`YYYY-MM-DD HH:MM:SS`
- **修改Markdown文件**: 通过`change_file()`函数读取本地Markdown文件，并根据会话内容更新文件

## 系统要求

- Node.js v18.0.0 或更高版本

## 安装步骤

1. 克隆或下载本项目到本地
2. 进入项目目录
3. 运行一键部署脚本：

```bash
# 赋予部署脚本执行权限
chmod +x deploy.sh

# 运行部署脚本
./deploy.sh
```

## 使用方法

### 作为模块导入

```javascript
// 导入MCP应用
import mcpApp from './src/index.js';

// 获取当前系统时间
const time = mcpApp.get_time();
console.log('当前时间:', time);

// 修改Markdown文件
await mcpApp.change_file('path/to/file.md', '会话内容');
```

### 运行示例

项目包含一个完整的使用示例：

```bash
node example.js
```

这将演示如何获取当前时间并修改示例Markdown文件。

## 项目结构

```
mcp-app/
├── src/
│   ├── index.js          # 主应用文件
│   └── utils/
│       ├── time-utils.js  # 时间工具模块
│       └── file-utils.js  # 文件工具模块
├── example.js            # 使用示例
├── example.md            # 示例Markdown文件
├── package.json          # 项目配置
├── deploy.sh             # 一键部署脚本
└── README.md             # 项目说明文档
```

## API文档

### get_time()

获取当前系统时间，返回格式化的时间字符串。

**返回值**: `string` - 格式为 `YYYY-MM-DD HH:MM:SS` 的时间字符串

### change_file(filePath, sessionContent)

读取并修改本地Markdown文件。

**参数**:
- `filePath` (string): Markdown文件的路径
- `sessionContent` (string): 要添加到文件中的会话内容

**返回值**: `Promise<boolean>` - 操作是否成功

### readFile(filePath)

读取Markdown文件内容。

**参数**:
- `filePath` (string): 文件路径

**返回值**: `Promise<string>` - 文件内容