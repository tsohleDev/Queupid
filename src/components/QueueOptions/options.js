import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOptionsToBarber } from "../../redux/queueOption/options";
import './options.scss';
import hairCut from '../Assets/Images/haircut.svg';
import nails from '../Assets/Images/nails 1.svg';
import { useState } from "react";

function Options() {
    const [clicked, setClicked] = useState(false)
    
    const dispatch = useDispatch()

    const handleClick = (e) => {
        const haircut = e.target.innerText === 'Haircut' ? true : false;
        dispatch(setOptionsToBarber(haircut))
        setClicked(true)
    }

    if (clicked) return <Navigate to='/join-queue' replace/>
    return (
        <section className="options">
            <h1>What service are you here for?</h1>
            
            <div>
                <img src={hairCut} alt="haircut" />
                <button onClick={handleClick}>Haircut</button>
            </div>

            <hr/>
                
            <div>
                <img className="nails-image" src={nails} alt="nails" />
                <button onClick={handleClick}>Nails</button>
            </div>
        </section>
    )
}

export default Options;