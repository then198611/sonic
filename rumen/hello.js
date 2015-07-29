var http = require('http');
　　http.createServer(doRequrest).listen(1337, "127.0.0.1");
　　console.log('Server running at http://127.0.0.1:1337/');
function doRequrest(req, res) {
　　  res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World\n');
　　}
// http.get('http://www.hichao.com',function(res){
//     console.log(res.statusCode)
// }).on('error',function(e){
//     console.log(e.message);
// })
