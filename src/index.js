// const socket = io('ws://localhost:5000');

import './index.scss'
import Menu from './modules/Menu';
// import Header from "./modules/Header.js";
import Navigate from "./modules/Navigate.js";


const main = document.querySelector('main')
const header = document.querySelector('header')
const menuButton = document.querySelector('#menu')
const home = document.querySelector('#home')
let current = home
let onMenu = false

const menuNode = new Menu(header) 

menuButton.addEventListener('click', () => { 
    if (!onMenu) { Navigate.from(main, 'flex', menuNode.node, menuNode, true) }
    else { Navigate.from(menuNode.node, 'block', main) }
    onMenu = !onMenu
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