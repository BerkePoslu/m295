const http = require('http');

const get = http.get(process.argv[2], (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    console.log(rawData)
});