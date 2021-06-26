const express = require('express')
const app = express()
const myServer = require('./server')
const Socket = require('./socket')
const path = require('path')
const http = require('http').Server(app);
const io = require("socket.io")(http);
const db = require('./db_connect')
const {
    nanoid
} = require('nanoid')

module.exports = {
    express,
    app,
    myServer,
    Socket,
    path,
    http,
    io,
    db,
    nanoid
}