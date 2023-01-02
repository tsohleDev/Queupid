import LeftChair from '../../images/left-seat.svg'
import CenterChair from '../../images/center_seat.svg'
import RightChair from '../../images/right-seat.svg'

import LeftSeated from '../../images/left.svg'
import RightSeated from '../../images/right.svg'
import CenterSeated from '../../images/center.svg'

class Chair {
    constructor (parent, p){
        this.alet = p
        this.parent = parent
    }

    render(i, seats) {
        const img = document.createElement('img')
        const occupied = seats[i].occupied
        switch (occupied) {
            case true:
                img.src = i === 2 ? RightSeated : 
                    !i ? LeftSeated : CenterSeated
                break;
        
            default:
                img.src = i === 2 ? LeftChair : 
                    !i ? RightChair : CenterChair
                break;
        }

        img.addEventListener('click', () => {
            if (seats[i].occupied) {
                const {username, style} = seats[i].client
                this.alet.innerText = `${username} is doing a ${style}`
            } else {
                this.alet.innerText = `Barber is ${seats[i].available}`
            }

            this.alet.style.display = 'block'

            setTimeout(() => {
                this.alet.innerText = null
                this.alet.style.display = 'none'
            }, 10000)

        })

        if (i === 1) { img.classList.add('middle-chair')}

        this.parent.appendChild(img)
    }

    renderAdmin(injections) {
        const img = document.createElement('img')

        const seat = injections['seats'].find(seat => {
            if (seat.barber) {
                return seat.barber.id === injections.user.id
            } else {
                return false
            }   
        })

        console.log(seat);
        const occupied = seat === undefined ? false : seat.occupied

        switch (occupied) {
            case true:
                img.src = CenterSeated
                break;
    
            default:
                img.src = CenterChair
                break;
        }

        img.addEventListener('click', () => {
            if (seat !== undefined) {
                injections['queue'].remove()
                injections['portfolio'].render(seat.client)
            }
        })

        this.parent.appendChild(img)
    }

    remove() {
        this.parent.removeChild(this.parent.firstChild)
    }
}

export default Chair