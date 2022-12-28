import Navigate from "./Navigate"

class Input {
    constructor(array){
        this.node = document.createElement('div')
        this.node.classList.add('input')

        this.parent = array[0]
        this.label = array[1]
        this.field = array[2]
        this.placeholder = array[3]
    }

    input = document.createElement('input')
    message = document.createElement('p')

    get value() {
        return [this.field, this.input.value]
    }

    render() {
        const label = document.createElement('label')
        label.setAttribute('for', this.field)
        label.textContent = this.label

        this.message.style.display = 'none'

        if (this.field === 'request') { this.input = document.createElement('textarea') }
        
        this.input.setAttribute('placeholder', this.placeholder)
        this.input.setAttribute('placeholder', this.placeholder)
        let type = this.field === 'age' ? 'number' : 'text'
        if (this.field === 'password' || this.field == 'confirm-password') { type = 'password' }
        this.input.setAttribute('type', type)

        this.node.appendChild(label)
        this.node.appendChild(this.message)
        this.node.appendChild(this.input)
        this.parent.appendChild(this.node)
    }

    remove() {
        Navigate.removeAllChildNodes(this.node)
        Navigate.removeAllChildNodes(this.parent)
    }

    alert = (text) => {
        this.message.innerText = text
        this.message.style.display = text ? 'block' : 'none'
    }
}

export default Input