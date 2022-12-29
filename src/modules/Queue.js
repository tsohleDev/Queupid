import Client from "./Client"
import Navigate from "./Navigate"
import Chair from "./Chair"

class Queue {
  constructor(injections){
    this.clients = injections['clients']
    this.injections = injections
    this.parent = document.querySelector('main')
    this.node = document.createElement('section')
    this.node.setAttribute('id', 'queue')

    this.chairsContainer = document.createElement('div')
    this.chairsContainer.classList.add('chairs')

    this.clientContainer = document.createElement('div')
    this.clientContainer.classList.add('clients')

    this.one = new Chair(this.chairsContainer)
    this.two = new Chair(this.chairsContainer)
    this.three = new Chair(this.chairsContainer)
    this.chairs = [this.one, this.two, this.three]
  }
  
  render() {
    console.log(this.clients);

    this.node.appendChild(this.chairsContainer)
    this.node.appendChild(this.clientContainer)

    for (let i = 0; i < this.chairs.length; i++) {
      this.chairs[i].render(i)
    }

    this.clients.forEach(element => {
        const client = new Client(element, false, this.clientContainer, this.injections)
        client.render()
    });

    const price = document.createElement('p')
    price.innerText = 'Cost : R100'
    this.node.appendChild(price)

    const button = document.createElement('button')
    button.textContent = 'Forfit'
    button.addEventListener('click', () => {
       //remove client from websocket
       Navigate.switchToHome(this)
    })

    this.node.appendChild(button)
    this.parent.appendChild(this.node)
  }

  remove() {
    Navigate.removeAllChildNodes(this.chairsContainer)
    Navigate.removeAllChildNodes(this.clientContainer)
    Navigate.removeAllChildNodes(this.node)
    if (this.parent.querySelector('#queue')) { this.parent.removeChild(this.node) }
  }

  updateChairs() {
    const array = this.clients.reduce((cutting, info) => {
      if (info.cutting == true) { cutting.push(info) }

      return info
    }, [])
    
    for (let i = 0; i < array.length; i++) {
      chairs[i].updateChair(array[i])
    }
  }

  appendClient(client) {
    if (this.node.firstChild) {
      const node = new Client(client, false, this.clientContainer, this.injections)
      node.render()
    }
  }


}

export default Queue