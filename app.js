const express = require('express');
const app = express();
const http = require('http').createServer(app);

const path = require('path')

var pg = require('pg');
var conString = "postgres://vsieuphf:FzhZMmLabj9DV8EZLow8SzXorXqnsiQL@satao.db.elephantsql.com/vsieuphf" //Can be found in the Details page

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) { return console.error('could not connect to postgres', err); }

  client.query('SELECT NOW() AS "theTime"', (err, result) => {
    if(err) { return console.error('error running query', err); }

    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});

const queue = []
const io = require('socket.io')(http, { cors: { origin: "*" } });

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/admin.html'));
});


io.on('connection', (socket) => {
  console.log('a user connected');

  io.emit('clients', queue );

  socket.on('client', (client) => {
      queue.unshift(client);

      console.log(client.name);

      io.emit('client', client);   
  });
});

http.listen(process.env.PORT || 5000, () => console.log('listening on http://localhost:5000') );

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

