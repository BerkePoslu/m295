const mymodule = require('./mymodule.js');


const directory = process.argv[2];
const extension = process.argv[3];

mymodule(directory, extension, (err, filteredFiles) => {
    if (err) {
        console.error('Error:', err);
        return;
    }

    filteredFiles.forEach(file => {
            console.log(file);
    });
});