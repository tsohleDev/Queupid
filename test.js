const express = require('express');
const app = express();
const http = require('http').createServer(app);
const server = require('socket.io')(http, { cors: { origin: "*" } });

server.on('connection', (socket) => {
    console.log('WebSocket connected');
  
    socket.send('Welcome to the WebSocket server!');
  
    socket.on('message', (message) => {
      console.log('WebSocket message received:', message);
      socket.send('You said: ' + message);
    });
  
    socket.on('close', () => {
      console.log('WebSocket disconnected');
    });
  });
  
  const port = process.env.PORT || 5000
  http.listen(port, () => console.log('listening on ', port) );