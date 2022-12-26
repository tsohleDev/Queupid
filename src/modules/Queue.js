import Person from "./Person";

class Queue {
  constructor(){
  }

  list = []

  initiate() {
    const container = document.querySelector('.clients')
    this.#removeAllChildNodes(container)

    this.list.forEach(element => {
        const client = new Person(element)
        client.append()
    });
  }

  #removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }
}

export default Queue