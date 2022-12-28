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
        child.render()
    }

    static switch(home, sectionOne, sectionTwo = null){
        if (home) {
            document.querySelector('#home').style.display = 'none'
            sectionOne.render()
        }  else {
            sectionOne.remove()
            sectionTwo.render()
        }
    }

    static switchToHome(section) {
        section.remove()
        document.querySelector('#home').style.display = 'flex'
    }

    static toHome() {
        document.querySelector('#home').style.display = 'flex'
    }

    static fromMenu(current, next, injections = null) {
        current.style.display = 'none'
        console.log(injections);

        const main = document.querySelector('main')
        main.style.display = 'block'

        const home = document.querySelector('#home')
        home.style.display = 'none'

        injections['queueForm'].remove()
        injections['queue'].remove()
        injections['about'].remove()

        if (next === 'login') {
            const login = new LogIn(main, false)
            login.render()
        } else if (next === 'Home') {
            home.style.display = 'flex'
        } else if (next === 'Get Cut') {
            injections['queueForm'].render()
        } else if (next === 'Queue') {
            injections['queue'].render()
        } else if (next === 'About') {
            injections['about'].render()
        } 
    }

    static removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}

export default Navigate