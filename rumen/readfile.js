var fs = require('fs');
fs.readFile('./moudle/mymoudle.js','utf-8',function(err,data){
    if(err){
        console.log(err);
    }
    console.log(data);
})
console.log('sync');//先执行