const socket = io('https://cutting-edge.onrender.com/');

import './index.scss'
import Menu from './modules/Menu';
// import Header from "./modules/Header.js";
import Navigate from "./modules/Navigate.js";
import JoinQueue from './modules/JoinQueue';
import Queue from './modules/Queue'
import About from './modules/About';
import Portfolio from './modules/Portfolio';
import Loading from './modules/Loading';

const main = document.querySelector('main')
const header = document.querySelector('header')
const home = document.querySelector('#home')

//buttons
const menuButton = document.querySelector('#menu')
const toJoin = document.querySelector('#join')
let onMenu = false


let clients = []

const errorcodes = {
  23505: 'duplicate user name',
  42601: 'some arguments missing',
}

let user = {username: 'N/A'}
if (localStorage.getItem('CE-user')) {user = JSON.parse(localStorage.getItem('CE-user'))}

const injections = { 'socket': socket, 'clients': clients, 'user':  user, 'errors': errorcodes}

const menuNode = new Menu(header, injections) 
injections['menu'] = menuNode
const queue = new Queue(injections)
injections['queue'] = queue
const queueform = new JoinQueue(injections)
injections['queueForm'] = queueform
const about = new About()
injections['about'] = about
const portfolio = new Portfolio(injections)
injections['portfolio'] = portfolio
const loading = new Loading(injections)
injections['loading'] = loading


if (user && user.admin) {
    menuButton.innerHTML = `<h3>${user.username}</h1>`
    const navBar = document.querySelector('.navigation')
    navBar.style.backgroundColor = 'transparent'
    navBar.style.boxShadow = '0 0'

    toJoin.innerText = 'Manage Queue'
    toJoin.addEventListener('click', () => { 
        Navigate.switch(true, queue) 
    })

    menuButton.addEventListener('click', () => {
        Navigate.toQueue(injections) 
    }) 
} else {
    toJoin.addEventListener('click', () => { 
        Navigate.switch(true, queueform) 
    })

    menuButton.addEventListener('click', () => { 
        if (!onMenu) { Navigate.from(main, 'flex', menuNode.node, menuNode, true) }
        else { Navigate.from(menuNode.node, 'block', main) }
        onMenu = !onMenu
    })
}

socket.on('client', client => {
    injections['clients'].push(client)
    queue.appendClient(client)
});
  
socket.on('clients', array => {
    injections['clients'] = array
    queue.updateQueue(array)
});

socket.on('seats', seats => {
    injections['seats'] = seats
    queue.updateChairs(seats)
})


document.querySelector('#db').addEventListener('click', async () => {
    const inP = document.querySelector('textarea')
    console.log(inP.value);
    const response = await fetch('/db', {
        method: 'POST',
        body: JSON.stringify({we: inP.value}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    const json = await response.json()

    console.log(json);
})