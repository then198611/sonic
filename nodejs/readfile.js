var fs = require('fs');

// fs.readFile('file.text','utf-8',function(err,data){
//     console.log( err ? err : data);
// });

// console.log('end');

// console.log('上面是异步获取，下面是同步获取');
var data = fs.readFileSync('file.text','utf-8');

console.log(data);
console.log('end');