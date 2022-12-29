import Male from '../../images/male.svg'
import Female from '../../images/female.svg'

import Navigate from './Navigate'
import Input from './Input'

class Portfolio {
    constructor(injections){
        this.injections = injections
        this.parent = document.querySelector('main')
        this.node = document.createElement('section')
        this.node.setAttribute('id', 'portfolio')
    }

    render() {
        const avatar = Male //this.injections['client'].sex ? Male : Female
        
        const img = document.createElement('img')
        img.src = avatar
        this.node.appendChild(img)

        const user = this.injections['user']
        const keys = Object.keys(user)
        const values = Object.values(user)

        const fullname = document.createElement('h1')
        fullname.innerText = `${user.firstname} ${user.lastname}`
        this.node.appendChild(fullname)
       
        keys.forEach((key, i) => {
            if (key !== 'id' && key !== 'username' 
            && key !== 'firstname' && key !== 'lastname'
            && key !== 'sex' && key !== 'email'
            && key !== 'age') { 
                const input = new Input([this.node, key, 'barber', 'Barber\'s name']);
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

        const remove = document.createElement('button')
        remove.innerText = 'Remove'
        remove.addEventListener('click', () => {
            this.injections.socket.emit('remove', user)
        }) 
        buttons.appendChild(remove)

        const finished = document.createElement('button')
        finished.classList.add('finish')
        finished.innerText = 'Done'
        finished.addEventListener('click', () => {
            this.injections.socket.emit('remove', user)
        })
        buttons.appendChild(finished)

        const stepdown = document.createElement('button')
        stepdown.innerText = 'Drop'
        stepdown.addEventListener('click', () => {
            this.injections.socket.emit('drop', user)
        })
        buttons.appendChild(stepdown)

        this.node.appendChild(buttons)

        this.parent.appendChild(this.node)
    }

    remove() {
        Navigate.removeAllChildNodes(this.node)
        if (this.parent.querySelector('#portfolio')) { this.parent.removeChild(this.node) }
    }
}

export default Portfolio