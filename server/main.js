const imprt = require('./component/imprt')

require('dotenv').config()

let server = new imprt.myServer(imprt.express, imprt.app, process.env.PORT, imprt.path.join(__dirname, '../public/views/pages'))

// Socket
let socket = new imprt.Socket(imprt.http, process.env.PORT)

server.views('ejs')
server.statics()

// Router
imprt.app.get('/', (req, res) => {
    res.render(server.page('home'), {
        title: "Home"
    })
})

imprt.app.get('/chat', (req, res) => {
    res.render(server.page('chat'), {
        title: "Chat"
    })
})

// Socket
imprt.io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        imprt.io.emit('chat message', msg);
    });
});


// Listen
socket.ls()


module.exports = server