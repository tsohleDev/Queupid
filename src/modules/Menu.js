import clipper from '../../images/clipper.svg'
import razor from '../../images/razor.svg'
import comb from '../../images/comb.svg'

import Navigate from './Navigate'

class Menu {
    constructor(parent, user){
        this.node = document.createElement('section')
        this.node.classList.add('menu')
        this.parent = parent

        this.#create(user)
    }

    #create(user) {
        const logIn = document.createElement('button')
        logIn.textContent = user ? `Hi ${user.name}` : 'login'
        logIn.classList.add('login')

        logIn.addEventListener('click', () => {
            Navigate.fromMenu(this.node, 'login')
        })

        const navigate = document.createElement('nav')

        const keys = ['Home', 'Get Cut', 'Queue','About']
        const values = [comb, clipper, razor, razor]

        for (let i = 0; i < keys.length; i++) {
            const linkTag = document.createElement('a')

            const img = document.createElement('img')
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