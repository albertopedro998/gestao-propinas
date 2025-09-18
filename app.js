const express = require("express")
const router = require("./routes")
class App {
    constructor(){
        this.server = express()
        this.server.use(express.json())
        this.server.use(router)
    }
}

module.exports = new App().server