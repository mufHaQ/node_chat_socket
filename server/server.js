class myServer {
    constructor(express, app, port, dir, so='') {
        this.express = express
        this.app = app
        this.port = port
        this.dir = dir
    }

    ls() {
        this.app.listen(this.port, () => {
            console.log(`Listening server @ http://localhost:${this.port}`)
        })
    }

    views(view) {
        this.app.set('view engine', view)
        this.app.set('views', this.dir)
    }
    
    statics() {
        this.app.use(this.express.static(__dirname + '/../public/assets'))
    }

    page(page) {
        return `${page}/${page}.ejs`
    }
}

class Socket {
    constructor(app, port) {
        this.app = app
        this.port = port
    }

    ls() {
        this.app.listen(this.port, () => {
            console.log(`Listening server @ http://localhost:${this.port}`)
        })
    }

}

module.exports = {
    myServer,
    Socket
}