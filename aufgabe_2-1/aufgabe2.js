const fs = require('fs');

function leseDateiInhalt(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

leseDateiInhalt('C:/Users/taapobe6/AppData/Roaming/npm/node_modules/learnyounode/docs-nodejs/http.html')
    .then(data => {
        console.log('Länge des Dateiinhalts:', data.length);
    })
    .catch(err => {
        console.error('Fehler beim Lesen der Datei:', err);
    });
