var fs = require('fs');
var data = 'json';

fs.writeFile('./file.text',data,'utf-8',function(err,data){
    console.log(err ? err : data);
})