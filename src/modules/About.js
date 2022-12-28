import One from '../../images/2022-04-19 1.svg'
import Two from '../../images/chairs 1.svg'

import Navigate from './Navigate'

class About {
    parent = document.querySelector('main')
    node = document.createElement('div')

    render() {
        this.node.setAttribute('id', 'about')

        const h1 = document.createElement('h1')
        h1.innerText = 'We offer the best'

        const p1 = document.createElement('p')
        p1.innerText = 'De disruptif manger et aussi comme même elle révolution manger du coup fais chier aucun évidemment. Le client est très important merci, le client sera suivi'

        const img = document.createElement('img')
        img.src = One

        const p2 = document.createElement('p')
        p2.innerText = `De disruptif manger et aussi comme même elle révolution manger du coup fais chier aucun évidemment.
        Le client est très important merci, le client sera suivi par le client. Énée n'a pas de justice, pas de résultat, pas de ligula, et la vallée veut la sauce. Morbi mais qui veut vendre une couche de contenu triste d'internet.`

        const img2 = document.createElement('img')
        img2.src = Two

        const p3 = document.createElement('p')
        p3.innerText = `De disruptif manger et aussi comme même elle révolution manger du coup fais chier aucun évidemment.
        Le client est très important merci, le client sera suivi par le client. Énée n'a pas de justice, 
        pas de résultat, pas de ligula, et la vallée veut la sauce. Morbi mais qui veut vendre une couche de 
        contenu triste d'internet. Être ivre maintenant, mais ne pas être ivre maintenant, mon urne est d'une 
        grande beauté, mais elle n'est pas aussi bien faite que dans un livre. Mécène dans la vallée de l'orc, dans l'élément même. 
        Certaines des exigences faciles du budget, qu'il soit beaucoup de temps pour dignissim et. Je ne m'en fais pas chez moi, ça 
        va être moche dans le vestibule. Mais aussi des protéines de Pour avant la fin de la semaine, qui connaît le poison, le résultat.`

        this.node.appendChild(h1)
        this.node.appendChild(p1)
        this.node.appendChild(img)
        this.node.appendChild(p2)
        this.node.appendChild(img2)
        this.node.appendChild(p3)
        this.parent.appendChild(this.node)
    }

    remove() {
        Navigate.removeAllChildNodes(this.node)
        if (this.parent.querySelector('#about')) { this.parent.removeChild(this.node) }
      }
}

export default About