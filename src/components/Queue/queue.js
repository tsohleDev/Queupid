import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/user/user';
import Chairs from "./chairs/chairs";
import Clients from "./clients/clients";
import './queue.scss'
import io from 'socket.io-client';

function Queue() {
    const [clients, setClients] = useState([]);
    const [seats, setSeats] = useState([]);
    const location = useLocation();
    
    //admin side rendering logic using redux state
    const [admin, setAdmin] = useState(false);
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    useEffect(() => {
        setAdmin(user && user.admin)
    }, [user])

    useEffect(() => {
        const socket = io('https://cutting-edge.onrender.com/');

        socket.on('client', (client) => {
            setClients(...clients, client);
        });
      
        socket.on('clients', array => {
            setClients(array);
        });
      
        socket.on('seats', seats => {
            setSeats(seats);
        });
      
        return () => {
            socket.off('client');
            socket.off('clients');
            socket.off('seats');
        };
    }, [location.pathname]);

    return (
        <section id="queue">
            <Chairs seats={seats} admin={admin} />

            {/* {clients.length > 0 && <Clients clients={clients} admin={admin}/>} */}
            <Clients admin={admin}/>

            {clients.length > 0 && <button className="button-forfit">Forfit</button>}
            {admin && <div className='admin-buttons'>
                <button>Take Break</button>
                <button>End Day</button>
            </div>}
        </section>
    )
}

export default Queue;