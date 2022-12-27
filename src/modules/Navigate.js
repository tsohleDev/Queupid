import LogIn from "./LogIn"

class Navigate{
    static from (current, display, next, menuNode = null, sideMenu = false) {
        current.style.display = 'none'
    
        // current = next
        if (sideMenu) { menuNode.append() }
        next.style.display = display
    }

    static to(parent, child) {
        parent.appendChild(child)
        
    }

    static fromMenu(current, next) {
        current.style.display = 'none'

        const main = document.querySelector('main')
        main.style.display = 'block'

        const home = document.querySelector('#home')
        home.style.display = 'none'

        const login = new LogIn(main, true)
        login.render()
    }

    static removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}

export default Navigate