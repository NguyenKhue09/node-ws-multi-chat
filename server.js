const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express); // https://www.w3schools.com/nodejs/met_http_createserver.asp
const wss = new WebSocket.Server({ server })

// on(event: 'connection', cb: (this: Server, socket: WebSocket, request: http.IncomingMessage) => void): this;
wss.on('connection', function connection(ws) {
  // on(event: 'message', listener: (this: WebSocket, data: WebSocket.Data) => void): this;
  ws.on('message', function incoming( data ) {
    console.log("tin nhan " + data);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

// https://www.w3schools.com/nodejs/met_server_listen.asp
server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})

