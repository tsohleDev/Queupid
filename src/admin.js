const socket = io('ws://localhost:5000');

import './admin.scss'
import Client from './modules/Client.js';
import Header from "./modules/Header.js";
import Navigate from "./modules/Navigate.js";

const header = document.querySelector('#header')

const headerNode = new Header('Ntsako', header);
headerNode.render()
headerNode.hide()

const main = document.querySelector('main')
const home = document.querySelector('#a-home')
const queue = document.createElement('section')
const portfolio = document.createElement('section')
let current = null

const toManage = document.querySelector('#manage')
toManage.addEventListener('click', () => {
    Navigate.from(home)
    headerNode.show()
    
    Navigate.to(main, queue)
})

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