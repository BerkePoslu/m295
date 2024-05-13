const fs = require('fs');
const path = require('path');

module.exports = function filteredFile(directory, extension, callback) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            return callback(err);
        }

        const filteredFiles = files.filter(file => path.extname(file) === '.' + extension);
    

        callback(null, filteredFiles);
    });
};