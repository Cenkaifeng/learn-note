const urls = [
    {info: 'link1', time:3000, priority: 1},
    {info: 'link2', time:2000, priority: 1},
    {info: 'link3', time:5000, priority: 2},
    {info: 'link4', time:1000, priority: 1},
    {info: 'link5', time:1200, priority: 1},
    {info: 'link6', time:2000, priority: 5},
    {info: 'link7', time:800, priority: 1},
    {info: 'link8', time:3000, priority: 1},
];

function loadImg(url) {
    return new Promise((resovle, reject) => {
        console.log("-----" + url.info + "start!");
        setTimeout(() => {
            console.log(url.info + "OK!!!");
            resovle();
        }, url.time)
    })
};

module.exports = {
    urls,
    loadImg
}