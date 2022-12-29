const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

const path = require('path')

var pg = require('pg');
const { connect } = require('http2');
const { cli } = require('webpack-dev-server');
var conString = "postgres://vsieuphf:FzhZMmLabj9DV8EZLow8SzXorXqnsiQL@satao.db.elephantsql.com/vsieuphf" //Can be found in the Details page

let queue = []

const io = require('socket.io')(http, { cors: { origin: "*" } });

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

app.post('/register', async function(request, response) {
  const client = new pg.Client(conString);
  const data = request.body

  const {username, firstname, lastname, secret, cell, email, age, sex} = data

  try {
    await client.connect()

    const query = await client.query(`
      INSERT INTO cuttingedge (username, firstname, lastname, secret, cell, email, age, sex)
      VALUES ('${username}', '${firstname}', '${lastname}', '${hash(`${secret}`)}', '${cell}', '${email}', '${age}', '${sex}');
    `)

    console.log(username, 'registered');
    return response.status(200).send('registered')
  } catch (error) {
    console.log('didnt work out', error.message);
    return response.status(400).send(error.code)
  }
});

app.post('/login', async (request, response) => {
  const client = new pg.Client(conString);
  const data = request.body
  const {username, password} = data
  console.log(data);
  console.log(username, hash(`${password}`));
  try {
    await client.connect()

    const query = await client.query(`SELECT * FROM "public"."cuttingedge"
      WHERE username = '${username}' AND secret = '${hash(`${password}`)}'
    `)

    if (query.rowCount !== 1) {
      console.log('attempt to login failed due to credentials');
      return response.status(404).send('404')
    }

    const json = delete query.rows[0].secret
    response.status(200).json(query.rows[0])
    console.log(username, 'loged in');
  } catch (error) {
    console.log('didnt work out', error.message);
    return response.status(504).send(error.message)
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  io.emit('clients', queue );
  console.log(queue);

  socket.on('client', (client) => {
      queue.push(client);

      console.log('insert', client.username)
      console.log('queue', queue);

      io.emit('client', client);   
  });

  socket.on('remove', (client) => {
    queue = queue.reduce((array, element) => {
      if (element.username !== client.username) {
        array.push(element)
      }

      return array;
    }, []);

    console.log('remove', client.username)
    io.emit('clients', queue);   
  });

  socket.on('drop', (client) => {
    const index = queue.indexOf(elment => {
      return elment.username === client.username
    })

    console.log('position', index);
    if (index !== queue.length) {
      const dum = queue[index + 1]
      queue[index+1] = queue[index]
      queue[index] = dum

      console.log('swap', client.username, 'with', queue[index].username)
      console.log('queue', queue);

      io.emit('clients', queue); 
    }  
  });

  socket.on('update', client => {
    queue.forEach((user, i) => {
      const {username, firstname, lastname} = user
      const {username: name, firstname: first, lastname: last} = client

      if (username === name && firstname === first && lastname === last) { 
        queue[i] = client
      }
    });
    queue[0] = client
    console.log('update', client);

    io.emit('clients', queue );
  })
});

http.listen(process.env.PORT || 5000, () => console.log('listening on http://localhost:5000') );
// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });