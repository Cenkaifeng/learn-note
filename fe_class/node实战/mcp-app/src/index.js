/**
 * MCP应用主文件
 * 基于Node.js v18+
 * 提供获取系统时间和修改本地Markdown文件的功能
 */

import { getTime } from "./utils/time-utils.js";
import {
  readMarkdownFile,
  changeMarkdownFile,
  updateMarkdownWithSession,
} from "./utils/file-utils.js";

/**
 * MCP应用类
 * 封装应用的核心功能
 */
class McpApp {
  /**
   * 获取当前系统时间
   * @returns {string} 格式化的当前时间
   */
  get_time() {
    return getTime();
  }

  /**
   * 读取并修改本地Markdown文件
   * @param {string} filePath - Markdown文件路径
   * @param {string} sessionContent - 会话内容
   * @returns {Promise<boolean>} 是否成功修改
   */
  async change_file(filePath, sessionContent) {
    try {
      return await updateMarkdownWithSession(filePath, sessionContent);
    } catch (error) {
      console.error("修改文件失败:", error);
      throw error;
    }
  }

  /**
   * 读取Markdown文件内容
   * @param {string} filePath - 文件路径
   * @returns {Promise<string>} 文件内容
   */
  async readFile(filePath) {
    try {
      return await readMarkdownFile(filePath);
    } catch (error) {
      console.error("读取文件失败:", error);
      throw error;
    }
  }
}

// 导出MCP应用实例
export default new McpApp();

// 如果直接运行此文件，输出使用说明
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("MCP应用已启动");
  console.log("当前时间:", getTime());
  console.log("使用方法:");
  console.log("1. 导入应用: import mcpApp from './index.js'");
  console.log("2. 获取时间: mcpApp.get_time()");
  console.log("3. 修改文件: mcpApp.change_file(filePath, sessionContent)");
}
