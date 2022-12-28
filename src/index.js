// const socket = io('ws://localhost:5000');

import './index.scss'
import Menu from './modules/Menu';
// import Header from "./modules/Header.js";
import Navigate from "./modules/Navigate.js";
import JoinQueue from './modules/JoinQueue';
import Queue from './modules/Queue'
import About from './modules/About';


const main = document.querySelector('main')
const header = document.querySelector('header')
const home = document.querySelector('#home')

//buttons
const menuButton = document.querySelector('#menu')
const toJoin = document.querySelector('#join')
let current = home
let onMenu = false

const injections = {}
const menuNode = new Menu(header, null, injections) 
injections['menu'] = menuNode
const queue = new Queue(injections)
injections['queue'] = queue
const queueform = new JoinQueue(injections)
injections['queueForm'] = queueform
const about = new About()
injections['about'] = about

menuButton.addEventListener('click', () => { 
    if (!onMenu) { Navigate.from(main, 'flex', menuNode.node, menuNode, true) }
    else { Navigate.from(menuNode.node, 'block', main) }
    onMenu = !onMenu
})


toJoin.addEventListener('click', () => { 
    Navigate.switch(true, queueform) 
})

// const headerNode = new Header('Ntsako', header);
// headerNode.render()
// headerNode.hide()

// const main = document.querySelector('main')
// const home = document.querySelector('#a-home')
// const queue = document.createElement('section')
// const portfolio = document.createElement('section')
// let current = null

// const toManage = document.querySelector('#manage')
// toManage.addEventListener('click', () => {
//     Navigate.from(home)
//     headerNode.show()
    
//     Navigate.to(main, queue)
// })

// const toPortfolio = document.querySelector('#')
// toManage.addEventListener('click', () => {
//     Navigate.from(home)
//     headerNode.show()
    
//     main.appendChild(queue)
// })

// socket.on('client', client => {
//     const c = new Client(client, false, queue)
//     p.append()
// });
  
// socket.on('clients', array => {
//     clients.list = array
//     clients.initiate()
// });