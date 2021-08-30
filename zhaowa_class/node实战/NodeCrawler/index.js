const superagent = require('superagent');
const cheerio = require('cheerio');

superagent.get('http://www.baidu.com').end((err, res) => {
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