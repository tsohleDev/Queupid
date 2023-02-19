import Field from './Field/field';
import './profile.scss';
import female from '../Assets/Images/female.svg';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function Profile() {
    const id = useParams()
    const [profile, setProfile] = useState(null);
    
    useEffect(() => {
        const socket = io('https://cutting-edge.onrender.com/');

        socket.emit('profile', id.id);

        socket.on('profile', profile => {
            setProfile(profile);
        });
      
        return () => {
            socket.off('profile');
        };

    }, []);


    const fields = profile => {
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
                value: profile.requests
            }
        ]
    }
    
    return (
        <section className="profile">
            {profile &&
             <> 
                <img src={female} alt='' />
                <pre className="profile__pre">John Doe</pre>

                {fields.map((field, index) => {
                    return <Field key={index} label={field.label} value={field.value} />
                })}
                
                <div className='admin-buttons'>
                    <button className="done">Done</button>
                    <button className="cut">Cut</button>
                    <button className="drop">Drop</button>
                </div>
            </>
            }
        </section>
    );
}

export default Profile;