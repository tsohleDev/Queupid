import LeftChair from '../../images/left-seat.svg'
import CenterChair from '../../images/center_seat.svg'
import RightChair from '../../images/right-seat.svg'

class Chair {
    constructor (parent){
        this.parent = parent
    }

    render(i) {
        const img = document.createElement('img')
        
        img.src = i === 2 ? LeftChair : 
        !i ? RightChair : CenterChair

        if (i === 1) { img.classList.add('middle-chair')}

        this.parent.appendChild(img)
    }

    updateChair(info) {

    }
}

export default Chair