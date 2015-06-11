var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function (req, res, next) {
    // 用 superagent 去抓取 http://www.hichao.com/forum/hot/0/1 的内容
    superagent.get('http://www.hichao.com/forum/hot/0/1')
        .end(function (err, sres) {
        // 常规的错误处理
        if (err) {
            return next(err);
        }
        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量， `$`
        // 剩下就都是 jquery 的内容了
        var $ = cheerio.load(sres.text);
        var items = [];
        $('tbody tr').each(function (idx, element) {
            var curT = $(element);
            items.push({
                title: curT.find('td').eq(0).text(),
                category: curT.find('td').eq(1).text(),
                href: curT.find('td').eq(0).find('a').attr('href')
            });
        });
        res.send(items);
    });
});

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});