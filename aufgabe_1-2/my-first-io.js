const fs = require('fs');


buf = fs.readFileSync(process.argv[2]);

const str = buf.toString()
const array = str.split('\n');
console.log(array.length - 1)