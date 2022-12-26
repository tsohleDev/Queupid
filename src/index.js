const socket = io('ws://localhost:5000');

import './style.scss'
// import './menu.scss'
import Person from './modules/Person.js'
import Menu from "./modules/Menu.js";
import Queue from './modules/Queue.js';

const clients = new Queue()

const menuButton = document.querySelector('#menu')
let current = document.querySelector('#home')
let imagebackground = true
const menu = document.querySelector('.menu')


let toogle = true
menuButton.addEventListener('click', () => {
  const menuToggler = new Menu(menu, current, true, imagebackground)
  menuToggler.toggle(toogle)
  toogle = !toogle
})

const join = document.querySelector('#join')
const pageNavigator = new Menu(join, current, false, false)
document.querySelector('#get-cut').addEventListener('click', () => {
  pageNavigator.toggle(true)
  imagebackground = false
  current = join
})

const inputs = document.querySelectorAll('#barber, #haircut, #request')
document.querySelector('#join-qeueu').addEventListener('click', () => {
  const client = {
    name: 'tsohle',
    sex: 1,
    barber: inputs[0],
    cut: inputs[1],
    request: inputs[2]
  }

  socket.emit('client', client)
})

socket.on('client', client => {
  const p = new Person(client)
  p.append()
});

socket.on('clients', array => {
  clients.list = array
  clients.initiate()
});