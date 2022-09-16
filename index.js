const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const os = require('./os')


app.use(express.static(path.join(__dirname , './public')))

io.on('connection' , socket=>{
    socket.on('launch' , ()=>{
        os
          .on('launchEvent' , (interface)=>{
            console.log(interface) 
            socket.emit('launch' , interface)
          })
          .LoadAppCache('all.js')
        
       
    })
})







server.listen(3000 , ()=>{
    console.log('server listening at *: 3000')
})