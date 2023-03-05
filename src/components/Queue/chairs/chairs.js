import { useEffect, useState } from 'react';
import leftSeat from '../../Assets/Images/left-seat.svg';
import leftSeated from '../../Assets/Images/left.svg';
import centerSeat from '../../Assets/Images/center-seat.svg';
import centerSeated from '../../Assets/Images/center.svg';
import rightSeat from '../../Assets/Images/right-seat.svg';
import rightSeated from '../../Assets/Images/right.svg';
import { Navigate } from 'react-router-dom';

function Chairs(props) {
    const [alert, setAlert] = useState(null);
    const chairs = [leftSeat, centerSeat, centerSeat, rightSeat];
    const seatedChairs = [leftSeated, centerSeated, centerSeated, rightSeated];
    const [adminSeat, setadminSeat] = useState(null);
    const [adminChair, setAdminChair] = useState(centerSeat);
    const [navigate, setNavigate] = useState(false);


    const { seats, user, admin, isBarber } = props;

    const handleClick = (e, i) => {
        if (admin && adminSeat && adminSeat.occupied) {
            setNavigate(true);
            return;
        }

        if (seats[i] && seats[i].occupied) { setAlert('Barber is cutting patient'); }
        else if (seats[i] && seats[i].available === 'open') { setAlert('Barber is ready for patient'); }
        else if (seats[i]) { setAlert('Barber is not working'); }

        setTimeout(() => {
         setAlert(null);  
        }, 3000);
    };

    const seat = (i) => {
        if (!seats[i]) return chairs[i];
        return seats[i].occupied ? seatedChairs[i] : chairs[i];
    }

    console.log(adminSeat);
    useEffect(() => {
        if (!user) return;

        let i = seats.findIndex(s => s.barber && s.barber.id === user.id)
        if (i === -1) i = seats.findIndex(s => s.barber === null);
        
        if (i !== -1) setadminSeat(seats[i]);
        if (seats[i] && seats[i].occupied) setAdminChair(centerSeated);
        console.log(i);
    }, [seats]);

    if (navigate) {return <Navigate to="/profile/5" />}
    return (
        <>
        {alert && <div className="alert">{alert}</div>}

        <div className={admin ? "chairs-admin" : "chairs"}>
            {(admin || !isBarber) && <img src={adminChair}
            onClick={(e)=>handleClick(e)}
            alt="barber's chair" className="one-chair" />}
            
            {(!admin && isBarber) && chairs.map((chair, i) => (
                <img key={i} src={seat(i)} alt="barber's chair" onClick={(e)=>handleClick(e,i)} 
                className={(i === 1 || i === 2) ? 'middle' : ''} />
            ))}
        </div>
        </>
    );
}

export default Chairs;