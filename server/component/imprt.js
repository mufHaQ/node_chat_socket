const express = require('express')
const app = express()
const myServer = require('./server')
const Socket = require('./socket')
const path = require('path')
const http = require('http').Server(app);
const io = require("socket.io")(http);

module.exports = {
    express,
    app,
    myServer,
    Socket,
    path,
    http,
    io
}