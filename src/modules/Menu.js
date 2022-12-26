import background from '../../images/home background.svg'
class Menu{
    constructor(menu, node, menuTransition, backgroundImage){
        this.menuTransition = menuTransition
        this.backgroundImage = backgroundImage
        this.menu = menu
        this.node = node
    }

    toggle(bool) {
        if (bool) this.#open()
        else this.#close()
    }

    #open() {
        this.node.style.display = 'none'
        document.querySelector('body').style.backgroundImage = 'none'

        if (this.menuTransition) {
            document.querySelector('.navigation').style.backgroundColor = 'transparent'
        }
        this.menu.style.display = 'flex'
    }

    #close() {
        this.menu.style.display = 'none'
        if (this.backgroundImage) {
          document.querySelector('body').style.backgroundImage = `url(${background})`
        }
        document.querySelector('.navigation').style.backgroundColor = 'rgba(130, 126, 126, 0.267)'
        this.node.style.display = 'flex'
    }
}

export default Menu