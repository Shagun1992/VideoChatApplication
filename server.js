const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http)

const port = process.env.PORT || 3000;
let client =0
app.use(express.static(__dirname +'/public'))



    io.on('connection', function (socket) {
        socket.on('NewClient', function () {
            if (client < 2) {
                if (client == 1) {
                    this.emit('CreatePeer')
                }
            }
            else {
                this.emit('SessionActive')
            }
            client++

        })

        socket.on('Offer', SendOffer)
        socket.on('Answer', SendAnswer)
        socket.on('disconnet', Disconnet)



    })
    function Disconnet() {
        if (client > 0)
            client--
    }
    function SendOffer(offer) {
        this.broadcast.emit("BackOffer", offer)

    }
    function SendAnswer(data) {
        this.broadcast.emit("BackAnswer", data)

    }

    //http.listen(port)
    http.listen(port, () => console.log("Server is listening on " +port +"port"))

    
