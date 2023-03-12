import Field from './Field/field';
import './profile.scss';
import female from '../Assets/Images/female.svg';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import url from '../../url';
import io from 'socket.io-client';

function Profile() {
    const id = useParams();
    const {user} = useSelector(state => state.auth0);
    const [profile, setProfile] = useState(null);
    const [clicked, setClicked] = useState(false);

    const location = useLocation();
    
    useEffect(() => {
        const socket = io(url);

        socket.on('clients', array => {
            setProfile(array.filter(c => `${c.id}` === id.id)[0]);
        });
      
        return () => {
            socket.off('clients');
        };
    }, [location.pathname]);

    const fields = () => {
        return [
            {
                label: 'Phone',
                value: profile.cell
            }, {
                label: 'Barber',
                value: profile.barber
            }, {
                label: 'Style',
                value: profile.style
            }, {
                label: 'Requests',
                value: profile.request
            }
        ]
    }

    /*
        handleDone
        @desc: sends a message to the server that the client is done
        @params: none
        @return: none
    */
    const handleDone = () => {
        const socket = io(url);
        socket.emit('remove', profile);

        setClicked(true);

        return () => {
            socket.off('remove');
        };
    }

    /*
        handleCut
        @desc: sends a message to the server that the barber is starting the cut
        @params: none
        @return: none
    */
    const handleCut = () => {
        const socket = io(url);
        socket.emit('start', [user.id, profile]);

        setClicked(true);

        return () => {
            socket.off('start');
        };
    }

    /*
        handleDrop
        @desc: sends a message to the server that the client is dropping down the queue
        @params: none
        @return: none
    */
    const handleDrop = () => {
        const socket = io(url);
        socket.emit('drop', profile.id);
        
        setClicked(true);

        return () => {
            socket.off('drop');
        };
    }
    
    console.log('clicked: ', clicked);
    if (clicked) { return <Navigate to='/queue' />}
    return (
        <section className="profile">
            {profile &&
             <> 
                <img src={female} alt='' />
                <pre className="profile__pre">{profile.username}</pre>

                {fields().map((field, index) => {
                    return <Field key={index} label={field.label} value={field.value} />
                })}
                
                <div className='admin-buttons'>
                    <button className="done" 
                    onClick={handleDone}>Done</button>
                    <button className="cut"
                    onClick={handleCut}>Cut</button>
                    <button className="drop"
                    onClick={handleDrop}>Drop</button>
                </div>
            </>
            }
        </section>
    );
}

export default Profile;