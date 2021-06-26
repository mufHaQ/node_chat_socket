const myServer = require('./server')

class Socket extends myServer {
    constructor(app, port) {
        super(app, port)
        this.app = app
        this.port = port
    }

    ls() {
        this.app.listen(this.port, () => {
            console.log(`Listening server @ http://localhost:${this.port}`)
        })
    }
}

module.exports = Socket