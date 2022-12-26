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
let pageNavigator = null
document.querySelector('#get-cut').addEventListener('click', () => {
  pageNavigator = new Menu(join, current, false, false)
  pageNavigator.toggle(true)
  imagebackground = false
  current = join
})

const inputs = document.querySelectorAll('#barber, #haircut, #request')
const queue = document.querySelector('#queue')
document.querySelector('#join-qeueu').addEventListener('click', () => {
  console.log('hello world')
  pageNavigator = new Menu(queue, current, false, false)
  pageNavigator.toggle(true)
  const client = {
    name: 'tsohle',
    sex: 1,
    barber: inputs[0],
    cut: inputs[1],
    request: inputs[2]
  }

  current = queue
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