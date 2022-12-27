const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');

const path = require('path')

var pg = require('pg');
var conString = "postgres://vsieuphf:FzhZMmLabj9DV8EZLow8SzXorXqnsiQL@satao.db.elephantsql.com/vsieuphf" //Can be found in the Details page

var client = new pg.Client(conString);

const queue = []
const io = require('socket.io')(http, { cors: { origin: "*" } });

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

app.post('/register', function(req, res) {
  const data = req.body

  client.connect((err) => {
    if(err) { return console.error('could not connect to postgres', err); }
  
    client.query(`
        INSERT INTO cuttingedge (id, username, firstname, lastname, secret, cell, email, age, sex)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
      `, [data.name, data.username, data.first, data.firstname, data.lastname, data.secret, data.cell, data.email, data.age, data.sex], (err, res) => {
        if (err) {
          console.error('Error inserting row:', err);
          return;
        }

        console.log(`${data.name} registered`);
        client.end();
    });
  });

  res.send(200)
});

app.post('/login', function(req, res) {
  const data = req.body
  const {name, secret} = data

  client.connect((err) => {
    if(err) { return console.error('could not connect to postgres', err); }
  
    client.query(`SELECT * FROM "public"."cuttingedge"
        WHERE username = $1 AND secret = $2
      `, [name. secret], (err, res) => {
        if (err) {
          console.error('Error inserting row:', err);
          return;
        }
        
        if (res.rowCount > 0) {
          console.log('Name and password combination exists in the database.');
        } else {
          console.log('Name and password combination does not exist in the database.');
        }
        
        console.log(`${data.name} loged in`);
        client.end();
    });
  });

  res.send(200)
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

