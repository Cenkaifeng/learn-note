/**
 * 文件工具模块
 * 提供读取和修改本地Markdown文件的功能
 */

import fs from "fs/promises";
import path from "path";

/**
 * 读取Markdown文件内容
 * @param {string} filePath - 文件路径
 * @returns {Promise<string>} 文件内容
 */
export async function readMarkdownFile(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    const content = await fs.readFile(absolutePath, "utf-8");
    return content;
  } catch (error) {
    throw new Error(`读取文件失败: ${error.message}`);
  }
}

/**
 * 修改Markdown文件内容
 * @param {string} filePath - 文件路径
 * @param {string} newContent - 新的文件内容
 * @returns {Promise<boolean>} 是否成功修改
 */
export async function changeMarkdownFile(filePath, newContent) {
  try {
    const absolutePath = path.resolve(filePath);
    await fs.writeFile(absolutePath, newContent, "utf-8");
    return true;
  } catch (error) {
    throw new Error(`修改文件失败: ${error.message}`);
  }
}

/**
 * 根据会话内容更新Markdown文件
 * @param {string} filePath - 文件路径
 * @param {string} sessionContent - 会话内容
 * @returns {Promise<boolean>} 是否成功更新
 */
export async function updateMarkdownWithSession(filePath, sessionContent) {
  try {
    // 读取原始文件内容
    const originalContent = await readMarkdownFile(filePath);

    // 在文件末尾添加会话内容
    const updatedContent = `${originalContent}\n\n## 会话更新 - ${new Date().toLocaleString()}\n${sessionContent}`;

    // 写入更新后的内容
    return await changeMarkdownFile(filePath, updatedContent);
  } catch (error) {
    throw new Error(`更新文件失败: ${error.message}`);
  }
}
