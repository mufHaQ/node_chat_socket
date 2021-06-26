const imprt = require('./pkg/imprt')

require('dotenv').config()

// Express
let server = new imprt.myServer(imprt.express, imprt.app, process.env.PORT, imprt.path.join(__dirname, '../public/views/pages'))

// Socket
let socket = new imprt.Socket(imprt.http, process.env.PORT)

server.views('ejs')
server.statics()

// Router
imprt.app.get('/', (req, res) => {
    res.render(server.page('home'), {
        title: "Home",
    })
})

imprt.app.get('/test', async (req, res) => {
    let rs = ''
    await imprt.db.query("SELECT * FROM test", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        rs = result
        res.send(rs)
    })
})

imprt.app.get('/chat', async (req, res) => {
    await imprt.db.query("SELECT * FROM test ORDER BY UNIX_TIMESTAMP(date) ASC", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render(server.page('chat'), {
            title: "Chat",
            data: result
        })
    })
})


// Socket
let pCount = 0

imprt.io.on('connection', (socket) => {
    pCount++

    // Count
    imprt.io.emit('cht_msg_count', pCount)

    socket.on('disconnect', () => {
        pCount--
        imprt.io.emit('cht_msg_count', pCount)
    });

    // Chat
    socket.on('cht_msg', (msg) => {
        imprt.io.emit('cht_msg', msg);

        let date1 = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        }).split(',')[0].split('/')
        let date2 = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        }).split(',')[1].split(' ')[1]
        let date = `${date1[2]}-${date1[0]}-${date1[1]} ${date2}`

        let vals = [
            [imprt.nanoid(10), msg, date]
        ]

        if (msg === '!clear') {
            imprt.db.query("TRUNCATE TABLE test")
            imprt.io.emit('clear', 'clear')
        } else {
            imprt.db.query(("INSERT INTO test (id, msg, date) VALUES ?"), [vals], (err, res) => {
                if (err) throw err;

                console.log("Number of records inserted: " + res.affectedRows);
            })
        }
    });
});


// Listen
socket.ls()


module.exports = server