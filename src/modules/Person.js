import male from '../../images/male.svg'

class Person {
    constructor(clientInfo){
        this.client = clientInfo
    }

    node = document.querySelector('.clients')

    render() {
        const char = male
        const container = document.createElement('div')
        container.classList.add('client-info')
        
        const img = document.createElement('img')
        img.src = char
        container.appendChild(img)

        const name = document.createElement('h2')
        name.innerHTML = this.client.name
        container.appendChild(name)

        this.node.appendChild(container)
    }
}

export default Person