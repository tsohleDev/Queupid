import clipper from '../../images/clipper.svg'
import razor from '../../images/razor.svg'
import comb from '../../images/comb.svg'
import wash from '../../images/hairwash.svg'

import Navigate from './Navigate'

class Menu {
    constructor(parent, injections){
        this.injections = injections
        this.node = document.createElement('section')
        this.node.classList.add('menu')
        this.parent = parent

        this.#create()
    }

    #create() {
        console.log('hello there');
        const logIn = document.createElement('button')
        logIn.textContent = this.injections['user'] ? `Hi ${this.injections['user'].username}` : 'login'
        logIn.classList.add('login')

        logIn.addEventListener('click', () => {
            Navigate.fromMenu(this.node, 'login', this.injections)
        })

        const navigate = document.createElement('nav')

        const keys = ['Home', 'Get Cut', 'Queue','About']
        const values = [comb, clipper, razor, wash]

        for (let i = 0; i < keys.length; i++) {
            const linkTag = document.createElement('a')

            linkTag.addEventListener('click', () => {
                Navigate.fromMenu(this.node, keys[i], this.injections)
            })

            const img = document.createElement('img')
            img.classList.add(`men${i}`)
            img.src = values[i]
            

            const txt = document.createElement('h4')
            txt.textContent = keys[i]

            if (i === 1 || i === 3) {
                linkTag.appendChild(img)
                linkTag.appendChild(txt)
            } else {
                linkTag.appendChild(txt)
                linkTag.appendChild(img)
            }
            

            navigate.appendChild(linkTag)
        }

        const hr = document.createElement('hr')

        this.node.appendChild(logIn) 
        this.node.appendChild(navigate)
        this.node.appendChild(hr)
    }

    append() {
        this.parent.appendChild(this.node)
    }
}

export default Menu