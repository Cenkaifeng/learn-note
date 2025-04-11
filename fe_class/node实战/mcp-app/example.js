/**
 * MCP应用使用示例
 */

import mcpApp from "./src/index.js";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 示例：获取当前系统时间
const currentTime = mcpApp.get_time();
console.log("当前系统时间:", currentTime);

// 示例：读取并修改Markdown文件
async function updateMarkdownExample() {
  try {
    // 文件路径 - 使用绝对路径确保能找到文件
    const filePath = path.join(__dirname, "example.md");

    // 会话内容
    const sessionContent = `
### 自动更新内容

这是通过MCP应用自动添加的内容。
当前时间: ${currentTime}
`;

    // 更新文件
    const result = await mcpApp.change_file(filePath, sessionContent);
    console.log("文件更新成功:", result);

    // 读取更新后的文件内容
    const updatedContent = await mcpApp.readFile(filePath);
    console.log("更新后的文件内容:\n", updatedContent);
  } catch (error) {
    console.error("示例执行失败:", error.message);
  }
}

// 运行示例
updateMarkdownExample();
