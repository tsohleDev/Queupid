import Male from '../../images/male.svg'
import Female from '../../images/female.svg'
import Navigate from './Navigate'

class Client {
    constructor(clientInfo, parent, injections, grandParent){
        this.grandParent = grandParent
        console.log('welkom', this.grandParent);
        this.injections = injections
        this.client = clientInfo
        this.admin = true// injections['user'].admin
        this.parent = parent
        this.node = document.createElement('div')
        this.node.classList.add('client-info')
    }

    render() {
        if (Navigate.isUser(this.injections['user'], this.client)) { this.node.style.backgroundColor = '#F9B339'}
        const avatar = this.client.sex ? Male : Female
        
        const img = document.createElement('img')
        img.src = avatar
        this.node.appendChild(img)

        const name = document.createElement('h2')
        name.innerHTML = this.client.username
        this.node.appendChild(name)

        if (this.admin) {
            const button = document.createElement('button')
            button.innerHTML = '<i class="fa-solid black fa-ellipsis-vertical"></i>'
            if (Navigate.isUser(this.injections['user'], this.client)) {
                const icon = document.querySelector('.fa-solid')
                if (icon) icon.style.color = '#000'
            }

            button.addEventListener('click', () => {
                this.grandParent.remove()
                console.log('granparent', this.grandParent);
                this.injections['portfolio'].render(this.client)
            })

            this.node.appendChild(button)
        }

        this.parent.appendChild(this.node)
    }

    remove() {
        Navigate.removeAllChildNodes(this.node)
        this.parent.removeChild(this.node);
    }
}

export default Client