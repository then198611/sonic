var fs = require('fs');

fs.stat('./file.text',function(err,data){
    console.log(err ? err : data);
})