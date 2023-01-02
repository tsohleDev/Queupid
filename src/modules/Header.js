import icon from '../../images/logo.svg'

class Header {
    constructor(name, node){
        this.name = name
        this.node = node
    }

    render() {
        const logo = document.createElement('img')
        logo.src = icon
        const adminName = document.createElement('h1')
        adminName.textContent = this.name
        this.node.appendChild(logo)
        this.node.appendChild(adminName)
    }

    show() {
        this.node.style.display = 'flex'
    }

    hide() {
        this.node.style.display = 'none'
    }
}


export default Header