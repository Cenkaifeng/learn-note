/**
 * 时间工具模块
 * 提供获取当前系统时间的功能
 */

/**
 * 获取当前系统时间
 * @returns {string} 格式化的当前时间字符串
 */
export function getTime() {
  const now = new Date();

  // 格式化时间为 YYYY-MM-DD HH:MM:SS 格式
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
