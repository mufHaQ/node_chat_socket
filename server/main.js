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
let pCount = 0
imprt.io.on('connection', (socket) => {
    pCount++
    
    console.log('a user connected');
    
    imprt.io.emit('cht_msg_count', pCount)

    socket.on('disconnect', () => {
        pCount--
        imprt.io.emit('cht_msg_count', pCount)
    });

    socket.on('cht_msg', (msg) => {
        console.log('message: ' + msg);
        imprt.io.emit('cht_msg', msg);
    });

    console.log(`${Object.keys(imprt.io.sockets.sockets).length}`)
});


// Listen
socket.ls()


module.exports = server