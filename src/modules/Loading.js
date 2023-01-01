import Navigate from "./Navigate"

class Loading {
    constructor(injections) {
        this.injections = injections
        this.parent = document.querySelector('main')
        this.node = document.createElement('section')
        this.node.setAttribute('id', 'loading')
    }

    render() {
        const div = document.createElement('div')
        div.classList.add('ring')
        const span = document.createElement('span')
        div.appendChild(span)
        this.node.appendChild(div)
        this.parent.appendChild(this.node)
    }

    remove() {
        Navigate.removeAllChildNodes(this.node)
        if (this.parent.querySelector('#loading')) { this.parent.removeChild(this.node) }
    }
}

export default Loading