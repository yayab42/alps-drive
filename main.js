const drive = require('./drive');
let server = require('./server');

/*drive.createRootFolder().then(()=> {
    server.start();
})*/


const creationPromise = drive.createRootFolder();
creationPromise.then(()=> {
    server.start();
})

