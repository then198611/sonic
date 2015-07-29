var fs = require('fs');

fs.open('./file.text', 'r+' ,function(err,data){
    console.log(err ? err : data);
})