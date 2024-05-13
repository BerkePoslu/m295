const fs = require('fs');

let array;

const readfile = (callback) => {
    fs.readFile(process.argv[2], (err, buf) => {
        if (err) {
            return console.error(err);
        }
        const str = buf.toString();
        array = str.split('\n');
        callback();
    });
};

const logarray = () => {
    console.log(array.length - 1);
};

readfile(logarray);