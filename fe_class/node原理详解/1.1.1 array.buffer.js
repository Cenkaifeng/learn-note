// const buffer = new ArrayBuffer(8);

// console.log(buffer);

// const int16Buffer = new Int16Array(buffer);

// console.log(int16Buffer)

// const unit8 = new Uint8Array(2);

// unit8[0] = 42;

// console.log(unit8[0])
// console.log(unit8.length)
// console.log(unit8.BYTES_PER_ELEMENT)

// 创建一个长度为10，填充为0的Buffer
// const buf1 = Buffer.alloc(10);// 全局对象

// console.log(buf1)

// 创建一个长度为10， 填充为1的Buffer
// const buf2 = Buffer.alloc(10, 1);// 全局对象

// console.log(buf1)

// allocUnsafe 比 alloc 更快， 但是 allocUnsafe 创建的缓冲区里可能存在旧数据。
// const buf3 = Buffer.allocUnsafe(10);

// console.log(buf3);

// 编码
const buf = Buffer.from('hello word', 'ascii');

console.log(buf);//<Buffer 68 65 6c 6c 6f 20 77 6f 72 64>


console.log(buf.toString('base64'))