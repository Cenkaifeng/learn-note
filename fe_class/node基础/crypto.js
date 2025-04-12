const crypto = require("crypto");

// input 是一个有数字和字符串的对象 通过 JSON.stringify 转换为字符串
const input = JSON.stringify({
  number: 123456,
  string: "test string",
}); // 将对象转换为字符串

const key = "12345678901234567890123456789012"; // 密钥长度必须为 32 字节

const iv = crypto.randomBytes(16); // 生成一个随机的 16 字节的初始化向量

// 创建 crypto 实例，选择算法 aes-256-cbc
const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);

// 加密输入数据并转换为十六进制字符串
let encrypted = cipher.update(input, "utf8", "hex");
encrypted += cipher.final("hex");
// 输出加密结果
console.log(encrypted);

//创建Decipher实例，选择算法为aes-256-cbc，使用密钥
const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
// 解密数据
let decrypted = decipher.update(encrypted, "hex", "utf-8");

decrypted += decipher.final("utf-8");
console.log("Decrypted:", JSON.parse(decrypted));
