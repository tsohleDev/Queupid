import male from '../../images/male.svg'

class Person {
    constructor(clientInfo){
        this.client = clientInfo
    }

    node = document.querySelector('.clients')

    append() {
        const char = male
        const container = document.createElement('div')
       
        container.innerHTML = `
        <img src=${char} /> ${this.client.name}
        `
        this.node.appendChild(container)
    }
}

export default Person