import Input from "./Input";
import Navigate from "./Navigate";

class JoinQueue {
  constructor(injections){
    this.injections = injections
    this.parent = document.querySelector('main')
    this.node = document.createElement('section')
    this.node.setAttribute('id', 'queue-form')
  }

  list = []

  render() {
    const inputs = [
        [this.node, 'Barber', 'barber', 'Barber\'s name'],
        [this.node, 'Style', 'style', 'Hair Style'],
        [this.node, 'Special Request', 'request', 'would you like extra services with your style... e.g Dye']
    ]

    const form = inputs.reduce((values, array) => {
        const input = new Input(array)
        input.render()

        values.push(input)
        return values
    }, [])

    const button = document.createElement('button')
    button.textContent = 'Queue'
    button.addEventListener('click', () => {
        let valid = true

        const data = form.reduce((client, input) => {
            let [key, value] = input.value

            console.log(value);
            if (key === 'style' && !value) { 
                valid = false
                input.alert('please select a hairstyle') 
            } else if (key === 'style'){
                valid = true
                input.alert(null)
            }

            client[key] = value

            return client
        }, {})

        if (valid) { 
            this.#send(data)

            Navigate.switch(false, this, this.injections.queue)
        }
    })

    this.node.appendChild(button)
    this.parent.appendChild(this.node)
  }

  remove() {
    Navigate.removeAllChildNodes(this.node)
    if (this.parent.querySelector('#queue-form')) { this.parent.removeChild(this.node) }
  }

  #send(data) {

  }
}

export default JoinQueue