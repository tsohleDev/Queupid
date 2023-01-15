import Male from '../../images/male.svg'
import Female from '../../images/female.svg'

import Navigate from './Navigate'
import Input from './Input'
import Queue from './Queue'

class Portfolio {
    constructor(injections){
        this.injections = injections
        this.parent = document.querySelector('main')
        this.node = document.createElement('section')
        this.node.setAttribute('id', 'portfolio')
    }

    render(client) {
        const avatar = Male //this.injections['client'].sex ? Male : Female
        
        const img = document.createElement('img')
        img.src = avatar
        this.node.appendChild(img)

        const keys = Object.keys(client)
        const values = Object.values(client)

        const fullname = document.createElement('h1')
        fullname.innerText = `${client.firstname} ${client.lastname}`
        this.node.appendChild(fullname)
       
        keys.forEach((key, i) => {
            if (key !== 'username' && key !== 'id'
            && key !== 'firstname' && key !== 'lastname'
            && key !== 'sex' && key !== 'email'
            && key !== 'age' && key !== 'admin') { 
                const input = new Input([this.node, key, 'info', 'Barber\'s name']);
                input.value = values[i]

                switch (key) {
                    case 'sex':
                        input.value = values[i] ? 'male' : 'female'
                    break;
                    case 'barber':
                        input.value = values[i] ? values[i] : 'any'
                    break;
                    case 'request':
                        input.value = values[i] ? values[i] : 'none'
                    break;
                    default:
                        break;
                }
                input.input.readOnly = true
                input.render()
            }
        });

        const buttons = document.createElement('div')
        buttons.classList.add('buttons')

        const remove = document.createElement('button')
        remove.innerText = 'Remove'
        remove.addEventListener('click', () => {
            this.injections.socket.emit('remove', client)
            delete this.injections.details
            
            Navigate.switchToHomePortfolio(this.injections)
        }) 
        buttons.appendChild(remove)

        const finished = document.createElement('button')
        finished.classList.add('finish')
        finished.innerText = 'Done'
        finished.addEventListener('click', () => {
            this.injections.socket.emit('remove', client)
            delete this.injections.details

            Navigate.switchToHomePortfolio(this.injections)
        })
        buttons.appendChild(finished)

        const stepdown = document.createElement('button')
        stepdown.innerText = 'Drop'
        stepdown.addEventListener('click', () => {
            this.injections.socket.emit('drop', client)
            delete this.injections.details

            Navigate.switchToHomePortfolio(this.injections)
        })
        buttons.appendChild(stepdown)

        this.node.appendChild(buttons)

        const adminButtons = document.createElement('div')
        adminButtons.classList.add('admin-buttons')

        const start = document.createElement('button')
        start.innerText = 'Cut this client'
        start.addEventListener('click', () => {
            this.injections['socket'].emit('start', [this.injections['user'].id, client])
            delete this.injections.details

            Navigate.switchToHomePortfolio(this.injections)
        })
        adminButtons.appendChild(start)

        this.node.appendChild(adminButtons)
        this.parent.appendChild(this.node)
    }

    remove() {
        this.node.querySelectorAll('.input').forEach(node => {
            Navigate.removeAllChildNodes(node)
        })
        Navigate.removeAllChildNodes(this.node)
        if (this.parent.querySelector('#portfolio')) { this.parent.removeChild(this.node) }
    }
}

export default Portfolio