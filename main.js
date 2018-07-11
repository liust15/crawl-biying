var http = require('https');
var request = require('request')
var fs = require('fs')
//get 请求外网  
var cheerio = require('cheerio');
function main() {
    for (var i = 1; i <= 72; i++) {
        var url = "https://bing.ioliu.cn/?p=" + i;
        getUrl(url);
    }
}

function getUrl(url) {
    http.get(url, function (req, res) {
        var html = '';
        req.on('data', function (data) {
            html += data;
        });
        req.on('end', function () {
            dataAnalysis(html)
        });

    });
}
function dataAnalysis(html) {
    var $ = cheerio.load(html);
    var elements = $(".container .item").find('img');
    for (var i = 0; i < elements.length - 1; i++) {
        var linkEle = elements[i].attribs.src;
        linkEle = linkEle.match(/(\S*)400x240.jpg/)[1] + '1920x1080.jpg';
        console.log('正在下载' + linkEle);
        download(linkEle, "./biyingimg", Math.floor(Math.random() * 100000) + linkEle.substr(-4, 4));
        console.log('下载完成');
    }
}
var download = function (url, dir, filename) {
    request.head(url, function (err, res, body) {
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};

main();