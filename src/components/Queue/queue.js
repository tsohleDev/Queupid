import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQueue } from '../../redux/queue/queue';
import { setOptionsToBarber } from '../../redux/queueOption/options';
import url from '../../url';
import Chairs from "./chairs/chairs";
import Clients from "./clients/clients";
import './queue.scss'
import io from 'socket.io-client';

function Queue() {
    const [clients, setClients] = useState([]);
    const [displayCliets, setDisplayClients] = useState([]);
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    
    //admin side rendering logic using redux state
    const isBarber = useSelector(state => state.options);
    const queue = useSelector(state => state.queue);
    
    const [admin, setAdmin] = useState(false);
    const {user} = useSelector(state => state.auth0)
    const dispatch = useDispatch();

    console.log('seats', seats);

    useEffect(() => {
        setAdmin(user && user.admin ? true : false)
    }, [user])

    useEffect(() => {
        dispatch(updateQueue(clients));
        if (clients.length === 0) setDisplayClients(clients);

        if (clients.length > 0) {
            console.log(clients);
            setDisplayClients(clients.filter(c => c.service === isBarber && !c.onSeat))
        }

    }, [isBarber, clients])

    useEffect(() => {
        const socket = io(url);

        socket.on('client', (client) => {
            setClients(...clients, client);
        });
      
        socket.on('clients', array => {
            setLoading(false);
            console.log('incoming',array);
            setClients(array);
        });
      
        socket.on('seats', seats => {
            setSeats(seats);
        });
      
        return () => {
            socket.off('client');
            //socket.off('clients');
            socket.off('seats');
        };
    }, [location.pathname]);

    const handleMoveUp = () => {
        dispatch(setOptionsToBarber(!isBarber));
    }

    const handleTakeBreak = () => {
        if (!user) return;

        const socket = io(url);

        socket.emit('break', user.id);
        return () => {
            socket.off('break');
        };
    }

    const handleEndDay = () => {
        if (!user) return;
        const socket = io(url);

        socket.emit('close', user.id);
        return () => {
            socket.off('close');
        };
    }

    const handleForfit = () => {
        if (!user) return;

        const socket = io(url);

        socket.emit('remove', user);

        return () => {
            socket.off('remove');
        };
    }

    return (
        <section id="queue">
            <div className='main'>
                <button className="button-nav" onClick={handleMoveUp}>
                    {isBarber ? 'Barber' : 'Nails'}
                </button>

                <Chairs seats={seats} user={user} isBarber={isBarber} admin={admin} />

                {displayCliets.length > 0 && <Clients clients={displayCliets} admin={admin}/>}

            </div>

            {loading && <div className="loading">Loading...</div>}

            {displayCliets.length > 0 && !admin && 
               <button className="button-forfit"
               onClick={handleForfit}>Forfit</button>
            }

            {admin && <div className='admin-buttons'>
                <button onClick={handleTakeBreak}>Take Break</button>
                <button onClick={handleEndDay}>End Day</button>
            </div>}
        </section>
    )
}

export default Queue;