import Male from '../../images/male.svg'
import Female from '../../images/female.svg'
import Navigate from './Navigate'

class Client {
    constructor(clientInfo, clientSide, parent){
        this.client = clientInfo
        this.clientSide = clientSide
        this.parent = parent
        this.node = document.createElement('div')
        this.node.classList.add('client-info')
    }

    render() {
        const avatar = this.client.sex ? Male : Female
        
        const img = document.createElement('img')
        img.src = avatar
        this.node.appendChild(img)

        const name = document.createElement('h2')
        name.innerHTML = this.client.name
        this.node.appendChild(name)

        if (!this.clientSide) {
            const button = document.createElement('button')
            button.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>'
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