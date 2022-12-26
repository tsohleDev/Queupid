class Client {
    constructor(clientInfo, clientSide, node){
        this.client = clientInfo
        this.clientSide = clientSide
        this.node = node
    }

    append() {
        const char = male
        const container = document.createElement('div')
        container.classList.add('client-info')
        
        const img = document.createElement('img')
        img.src = char
        container.appendChild(img)

        const name = document.createElement('h2')
        name.innerHTML = this.client.name

        if (!this.clientSide) {
            const button = document.createElement('button')
            name.innerHTML = ':'
            container.appendChild(button)
        }

        this.node.appendChild(container)
    }
}

export default Client