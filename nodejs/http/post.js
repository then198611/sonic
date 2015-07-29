var http = require('http');
var querystring = require('querystring');

var server = http.createServer(function(req,res){
    var post = '';
    req.on('data',function(c){
        post += c;
    })
    
    req.on('end',function(){
        post = querystring.parse(post);
        
        res.write(post.title);
        res.write(post.text);
        res.end();        
    })
}).listen(3000)

console.log('3000   ing ...')