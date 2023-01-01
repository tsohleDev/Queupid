import Client from "./Client"
import Navigate from "./Navigate"
import Chair from "./Chair"

class Queue {
  constructor(injections){
    this.injections = injections
    this.parent = document.querySelector('main')
    this.node = document.createElement('section')
    this.node.setAttribute('id', 'queue')

    this.chairsContainer = document.createElement('div')
    this.chairsContainer.classList.add('chairs')

    this.clientContainer = document.createElement('div')
    this.clientContainer.classList.add('clients')

    this.alert = document.createElement('p')

    this.one = new Chair(this.chairsContainer, this.alert)
    this.two = new Chair(this.chairsContainer, this.alert)
    this.three = new Chair(this.chairsContainer, this.alert)
    this.chairs = [this.one, this.two, this.three]
  }
  
  clients = [] 
  
  render() {
    this.updateChairs()
    this.node.appendChild(this.alert)
    this.alert.style.display = 'none'
    console.log('top', this.clients);

    this.node.appendChild(this.chairsContainer)
    this.node.appendChild(this.clientContainer)

    for (let i = 0; i < this.chairs.length; i++) {
      this.chairs[i].render(i, this.injections['seats'])
    }

    console.log('before', this.clients);
    this.injections['clients'].forEach(element => {
        const client = new Client(element, this.clientContainer, this.injections, this)
        client.render()
    });

    
    if (this.injections['details']) {
      switch (this.injections['details'][1][1]) {
        case 'cut':
          this.#renderPrice('100')
          break;
        case 'cut&dye':
          this.#renderPrice('120')
          break;
        case 'cut&fibre':
          this.#renderPrice('150')
          break;
        case 'cut&bleach':
          this.#renderPrice('180')
          break;
        case 'chiskop':
          this.#renderPrice('30')
          break;
        case 'chiskopClipper':
          this.#renderPrice('50')
          break;
        case 'beard':
          this.#renderPrice('20')
          break;
        case 'beardRazor':
          this.#renderPrice('30')
          break;
        case 'edgeUp':
          this.#renderPrice('20')
          break;
        case 'lineDesign':
          this.#renderPrice('10+')
          break;
        default:
          break;
      }  

      const button = document.createElement('button')
      button.textContent = 'Forfit'
      button.addEventListener('click', () => {
        //remove client from websocke
        this.injections.socket.emit('remove', this.injections['user'])
        delete this.injections.details
        Navigate.switchToHome(this)
      })

      this.node.appendChild(button)
    }

    this.parent.appendChild(this.node)
    console.log('before', this.injections['clients']);
  }

  remove() {
    Navigate.removeAllChildNodes(this.chairsContainer)
    Navigate.removeAllChildNodes(this.clientContainer)
    Navigate.removeAllChildNodes(this.node)
    if (this.parent.querySelector('#queue')) { this.parent.removeChild(this.node) }
  }

  updateChairs(seats) {
    if (this.node.firstChild) {
      Navigate.removeAllChildNodes(this.chairsContainer)

      for (let i = 0; i < this.chairs.length; i++) {
        this.chairs[i].render(i, seats)
      }
    }
  }

  updateQueue(clients) {
    if (this.node.firstChild) {
      Navigate.removeAllChildNodes(this.clientContainer)

      clients.forEach(element => {
        const client = new Client(element, this.clientContainer, this.injections, this)
        client.render()
      });
    }
  }

  appendClient(client) {
    if (this.node.firstChild) {
      const node = new Client(client, this.clientContainer, this.injections, this)
      node.render()
    }
  }

  #renderPrice(cost) {
    const price = document.createElement('p')
    price.innerText = `Cost: R${cost}`
    this.node.appendChild(price)
  }
}

export default Queue