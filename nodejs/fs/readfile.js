var fs = require('fs');

fs.readFile('./file.text', 'utf-8', function (err, data) {
    console.log(err ? err : data);
})