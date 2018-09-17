/* eslint-disable */
var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
    user: "user", // NOTE that this was username in 1.x 
    password: "password", // optional, prompted if none given
    host: "ftp",
    port: 21,
    localRoot: __dirname + '/dist',
    remoteRoot: '/public_html/',
    include: ['*', '**/*'], // this would upload everything except dot files
    // include: ['index.html'],
    // exclude: ['**/*.map', 'PHPMailer-master/**/*', 'video/*'], // e.g. exclude sourcemaps
    // deleteRemote: true              // delete existing files at destination before uploading
}

// use with promises
ftpDeploy.deploy(config)
    .then(res => console.log('finished'))
    .catch(err => console.log(err))

ftpDeploy.on('uploading', function (data) {
    console.log(data.transferredFileCount,"/",data.totalFilesCount, data.filename); 
});

ftpDeploy.on('uploaded', function (data) {
    console.log("\x1b[32m", "[uploaded]", "\x1b[0m"); // same data as uploading event
});

ftpDeploy.on('upload-error', function (data) {
	console.log(data.err); // data will also include filename, relativePath, and other goodies
});

// use with callback
// ftpDeploy.deploy(config, function(err) {
//     if (err) console.log(err)
//     else console.log('finished');
// });