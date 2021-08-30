const superagent = require('superagent');
const cheerio = require('cheerio');

const word = '猫咪'
const headers = {
'Content-Encoding': 'gzip',

}

superagent
    .get(`https://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=${encodeURIComponent(word)}`)
    .end((err, res) => {
    if( err) {
        console.log('访问失败---',err)
    } else {
        // console.log(res.text)
        const htmlText = res.text;

        const $ = cheerio.load(htmlText);

        $('meta').each((index, ele) => {
            console.log(index);
            console.log($(ele).attr('content'))
        })
    }
})