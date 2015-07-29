var fs = require('fs');

var data = fs.readFileSync('./file.text','utf-8');

console.log(data);