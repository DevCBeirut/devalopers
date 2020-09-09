let fs = require('fs')
let os = require("os");
require('dotenv').config();
console.log(require('dotenv').config())
const express = require('express');
//const favicon = require('express-favicon');
const path = require('path');
const port = process.env.REACT_APP_PORT || 3002;
const app = express();
const buildfolder = "build";
//app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, buildfolder)));
app.get('/ping', function (req, res) {
    return res.send('pong');
});
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, buildfolder, 'index.html'));
});
app.listen(port);

console.log(` listening on ${port}`);
// install express globally ,
// sudo npm install -g express   sudo npm install -g express-generator
// node prodserver.js

let debugStream = fs.createWriteStream(__dirname + '/error.log', {flags: 'a'})

process.on('unhandledRejection', function (reason, p) {
    console.error(reason.stack);
    debugStream.write("unhandledRejection :  "+reason.stack+os.EOL);
    debugStream.write(p);
    debugStream.write(os.EOL);
    console.log("Node NOT Exiting...");
});

process.on('uncaughtException', function (error) {
    console.error(error.stack);
    debugStream.write("uncaughtException : "+error.stack+os.EOL);
    console.log("Node NOT Exiting...");
});
