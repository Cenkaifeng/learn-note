const net = require('net');

class Request {
    constructor(options = {}) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.header || {};
        if(!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if(this.headers["Content-Type"] === "application/json"){
            this.bodyText = JSON.stringify(this.body);
        } else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }

        this.headers["Content-Length"] = this.bodyText.length;
    }

    send(connection) {
        return new Promise( (resolve, reject) => {
            //... 第二步
            const parser = new ResponseParser;
            // 第三步
            if(connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString());
                })
            }
            connection.on('data', (data) => {
                console.log(data.toString());
                parser.receive(data.toString());
                if(parser.inFinished) {
                    resolve(parser.response);
                    connection.end();
                }
            })
            connection.on('error', (err) => {
               console.log('哦吼 报错！:', err)
               reject(err);
               connection.end(); 
            })
            // resolve("");
        });
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
    }


}

class ResponseParser {
    constructor() {
        // 第四步 课后小作业，把常量状态改为函数状态
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END =6;
        this.WAITING_BODY = 7;

        this.current = this.WAITING_STATUS_LINE; //当前状态初始化
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;
    }
    get isFinish() {
        return this.bodyParser && this.bodyParser.isFinished;
    }
    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }
    receive(string) {
        for(let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
    }        
    receiveChar(char){
        if(this.current === this.WAITING_STATUS_LINE) {
            if(char === '\r'){
                this.current = this.WAITING_STATUS_LINE_END;
            } else {
                this.statusLine += char;
            }
        } else if(this.current === this.WAITING_STATUS_LINE_END) {
            if(char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if(this.current === this.WAITING_HEADER_NAME) {
            if(char === ':') {
                this.current = this.WAITING_HEADER_SPACE;
            } else if(char === '\r') {
                this.current = this.WAITING_HEADER_BLOCK_END;
                    // 第五步
                    if(this.headers['Transfer-Encoding'] === 'chunked')// Transfer-Encoding有很多值 node 默认 chunced
                        this.bodyParser = new TrunkedBodyParser();
            } else {
                this.headerName += char;
            }
        } else if(this.current === this.WAITING_HEADER_SPACE) {
            if(char === ' ') {
                this.current = this.WAITING_HEADER_VALUE;
            }
        } else if(this.current === this.WAITING_HEADER_VALUE) {
            if(char === '\r') {
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                this.headerName = "";
                this.headerValue = "";
            } else {
                this.headerValue += char;
            }
        } else if(this.current === this.WAITING_HEADER_LINE_END) {
            if(char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if(this.current === this.WAITING_HEADER_BLOCK_END) {
            if(char === '\n') {
                this.current = this.WAITING_BODY;
            }
        } else if(this.current === this.WAITING_BODY) {
            // console.log(char);// 第五步
            this.bodyParser.receiveChar(char);
        }
    }
}

// 第五步
class TrunkedBodyParser {
    constructor() {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.REEADING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.length = 0;
        this.content = [];
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;
    }
    receiveChar(char) {
        if(this.current === this.WAITING_LENGTH) {
            if(char === '\r') {
                if(this.length === 0) {
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            } else {
                this.length *=16;// 因为 length 是十六进制
                this.length *= parseInt(char, 16);
            }
        } else if(this.current === this.WAITING_LENGTH_LINE_END) {
            if(char == '\n') {
                this.current = this.REEADING_TRUNK;
            }
        } else if(this.current === this.REEADING_TRUNK) {
            this.content.push(char);
            this.lenght --;
            if(this.length === 0) {
                this.current = this.WAITING_NEW_LINE;
            }
        } else if(this.current === this.WAITING_NEW_LINE) {
            if(char === '\r') {
                this.current = this.WAITING_LENGTH_LINE_END;
            }
        } else if(this.current === this.WAITING_LENGTH_LINE_END) {
            if(char === '\n') {
                this.current = this.WAITING_LENGTH;
            }
        }
    }

}

// void 出现在任意类型的操作数之前执行操作数，却忽略操作数的返回值，返回一个 undefined ,利用高优先级执行
void async function() {
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8088",
        path: "/",
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: "Jervis"
        }
    });

    let response = await request.send();

    console.log(`请求返回值:${response}`)
}()