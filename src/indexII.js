const socket = io('ws://localhost:5000');

import './index.scss'
// import './menu.scss'
import Person from './modules/Person.js'
import Menu from "./modules/Menu.js";
import Queue from './modules/Queue.js';

const clients = new Queue()

const menuButton = document.querySelector('#menu')
const home = document.querySelector('#home')
let current = home
let imagebackground = false
const menu = document.querySelector('.menu')

let pageNavigator = null
let toogle = true
menuButton.addEventListener('click', () => {
  if (current !== home) imagebackground = false
  pageNavigator = new Menu(menu, current, true, imagebackground)
  pageNavigator.toggle(toogle)

  imagebackground = !imagebackground
  toogle = !toogle
})

const join = document.querySelector('#join')
document.querySelector('#get-cut').addEventListener('click', () => {
  pageNavigator = new Menu(join, current, false, false)
  pageNavigator.toggle(true)
  
  current = join
})

const inputs = document.querySelectorAll('#barber, #haircut, #request')
const queue = document.querySelector('#queue')
document.querySelector('#join-qeueu').addEventListener('click', () => {
  pageNavigator = new Menu(queue, current, false, false)
  pageNavigator.toggle(true)
  
  const client = {
    name: 'tsohle',
    sex: 1,
    barber: inputs[0],
    cut: inputs[1],
    request: inputs[2]
  }

  const p = new Person(client)
  p.append()
  
  current = queue
  socket.emit('client', client)
})

document.querySelector('#forfit-qeueu').addEventListener('click', () => {
  pageNavigator = new Menu(home, current, false, true)
  pageNavigator.toggle(true)

  current = home
})

socket.on('client', client => {
  const p = new Person(client)
  p.append()
});

socket.on('clients', array => {
  clients.clients = array
  clients.initiate()
});