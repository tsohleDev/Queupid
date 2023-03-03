const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

const path = require('path')

var pg = require('pg');
const { connect } = require('http2');
var conString = "postgres://clients_user:PDEYxoHr8eQiipm7b8lgI9LrqkJZPZwP@dpg-cehoqlpgp3jvlf06e91g-a/clients" //Can be found in the Details page
 
const connectToDatabase = async () => {
  try 
  {
    const client = new pg.Client(conString);
    await client.connect()

    const query = await client.query(`
    CREATE TABLE cuttingedge (
      id serial primary key,
      username varchar(255) NOT NULL UNiQUE,
      firstName varchar(255) NOT NULL,
      lastName varchar(255) NOT NULL,
      secret varchar(255) NOT NULL,
      cell varchar(255) NOT NULL,
      email varchar(255),
      age int,
      sex int,
      admin boolean
  );`)

    console.log('table create', query);
    console.log('connected');
  } catch (error) {
    console.log('couldnt connect to database', error.message);
  }
}

connectToDatabase()

let queue = []
const seats = [
  {
    occupied: false,
    available: 'closed',
    client: null,
    barber: null,
  }, 
  {
    occupied: false,
    available: 'closed',
    client : null,
    barber: null
  },
  {
    occupied: false,
    available: 'closed',
    client: null,
    barber: null
  },
  {
    occupied: false,
    available: 'closed',
    client: null,
    barber: null
  }
]

const emtySeat = (index, availability, id) => {
  seats[index] = {
    occupied: false,
    available: availability,
    client: null,
    barber: id,
  }
}

const io = require('socket.io')(http, { cors: { origin: "*" } });
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

app.post('/register', async function(request, response) {
  const client = new pg.Client(conString);
  const data = request.body
  console.log('attempt to register', data.username);

  let {username, firstname, lastname, secret, cell, email, age, sex} = data

  username = username.toLowerCase()
  try {
    await client.connect()
    
    const query = await client.query(`
      INSERT INTO cuttingedge (username, firstname, lastname, secret, cell, email, age, sex, admin)
      VALUES ('${username}', '${firstname}', '${lastname}', '${hash(`${secret}`)}', '${cell}', '${email}', ${age}, ${sex}, false);
    `)

    console.log(username, 'registered');
    return response.status(200).send(data)
  } catch (error) {
    console.log('didnt work out', error.message);
    return response.status(400).send(error.code)
  }
});

app.post('/database', async (request, response) => {
  const client = new pg.Client(conString);
  const queryString = request.body

  try {
    await client.connect()
    
    const query = await client.query(queryString)

    console.log(username, 'registered');
    return response.status(200).send(query.rows)
  } catch (error) {
    console.log('didnt work out', error.message);
    return response.status(400).send(error.code)
  }
});

app.post('/login', async (request, response) => {
  const client = new pg.Client(conString);
  const data = request.body
  let {username, secret} = data
  username = username.toLowerCase()

  console.log('attempt to login by', username);
  
  try {
    await client.connect()

    const query = await client.query(`SELECT * FROM "public"."cuttingedge"
      WHERE username = '${username}' AND secret = '${hash(`${secret}`)}'
    `)

    if (query.rowCount !== 1) {
      console.log('attempt to login failed due to credentials');
      return response.status(404).send('404')
    }

    response.status(200).json(query.rows[0])
    console.log(username, 'loged in');
  } catch (error) {
    console.log('didnt work out', error.message);
    return response.status(504).send(error.message)
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  io.emit('clients', queue);
  io.emit('seats', seats)

  socket.on('client', (client) => {
      queue.push(client);

      console.log('insert', client.username)
      console.log('queue', queue);

      io.emit('client', client);   
  });

  socket.on('profile', (id) => {
    const profile = queue.find(client => id === client.id) || null
    io.emit('profile', profile);
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

    const seat = seats.findIndex(seat => {
      if (seat.client) {
        return client.username === seat.client.username
      } else { 
        return false
      }

    })

    if (seat >= 0) {
      console.log('removing seat holder');
      seats[seat].occupied = false
      seats[seat].available = 'is seting up for next client'
      seats[seat].client = null

      io.emit('seats', seats)
    } 
  });

  socket.on('drop', (client) => {
    const index = queue.findIndex(elment => {
      return elment.id === client.id
    })

    if (index + 1 !== queue.length) {
      const dum = queue[index + 1]
      queue[index+1] = queue[index]
      queue[index] = dum

      console.log('swap', client.username, 'with', queue[index].username)

      io.emit('clients', queue); 
    }  
  });

  socket.on('update', client => {
    const indx = queue.findIndex(c => c.id == client.id)
    if (indx >= 0) queue[indx] = client

    console.log('update', client);

    io.emit('clients', queue );
  })

  socket.on('start', array => {
    const index = seats.findIndex(seat => seat.barber === null || seat.barber.id === array[0]) 
    const client = array[1]

    console.log(index);
    seats[index] = {
      occupied: true,
      available: null,
      client: array[1],
      barber: {id: array[0]}
    }
    io.emit('seats', seats)

    queue = queue.reduce((array, element) => {
      if (element.username !== client.username) {
        array.push(element)
      }

      return array;
    }, []);

    console.log(client.username, 'is now on seat')
    io.emit('clients', queue);
    console.log('new queue', queue);
  })

  socket.on('break', id => {
    const index = seats.findIndex(seat => seat.barber.id === id) 
    
    if (index !== -1) {
      emtySeat(index, 'on break', { 'id': id })
      console.log(seats[index].barber, 'is on breakt')
      io.emit('seats', seats);
    }
  })

  socket.on('close', id => {
    const index = seats.findIndex(seat => seat.barber.id === id) 
    
    if (index !== -1) {
      emtySeat(index, 'closed', null)
      console.log(seats[index].barber, 'is closed')
      io.emit('seats', seats);
    }
  })
});

const port = process.env.PORT || 5000
http.listen(port, () => console.log('listening on ', port) );