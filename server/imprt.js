const express = require('express')
const app = express()
const {myServer, Socket} = require('./server')
const path = require('path')
const http = require('http');
const srv = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(srv);

module.exports = {
    express,
    app,
    myServer,
    Socket,
    path,
    http,
    srv,
    Server,
    io
}