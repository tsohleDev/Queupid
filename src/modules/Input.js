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

    set value(string) {
        this.input.value = string
    }

    render() {
        const label = document.createElement('label')
        label.setAttribute('for', this.field)
        label.textContent = this.label

        this.message.style.display = 'none'

        if (this.field === 'request') { this.input = document.createElement('textarea') }
        
        if (this.field === 'style') {
            this.input = document.createElement('select')
            this.input.innerHTML = `
            <option value="cut">Standard haircut</option>
            <option value="cut&dye">Cut and dye</option>
            <option value="cut&fibre">cut and hair fibre powder</option>
            <option value="cut&bleach">Cut and bleach</option>
            <option value="chiskop">Chiskop razor</option>
            <option value="chiskopClipper">Chiskop clipper</option>
            <option value="beard">Beard shave</option>
            <option value="beardRazor">Beard shave razor</option>
            <option value="edgeUp">Edge up</option>
            <option value="lineDesign">Line design</option>`

        } else if (this.field === 'barber') {
            this.input = document.createElement('select')
            this.input.innerHTML = `
            <option value="any">Any of our best Barbers</option>
            <option value="ntsako">Ntsako</option>
            <option value="dimpho">DiMpho</option>
            <option value="audi">Cut and bleach</option>`
        } else {    
            this.input.setAttribute('placeholder', this.placeholder)
            this.input.setAttribute('placeholder', this.placeholder)
            let type = this.field === 'age' ? 'number' : 'text'
            if (this.field === 'password' || this.field == 'confirm-password') { type = 'password' }
            this.input.setAttribute('type', type)
        }

        

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