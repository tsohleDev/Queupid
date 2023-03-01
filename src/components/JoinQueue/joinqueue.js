import { useState, useEffect } from 'react';
import { getUser } from '../../redux/user/user';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import './form.scss'
import { Navigate } from 'react-router-dom';

const socket = io('https://cutting-edge.onrender.com/');

function JoinQueue() {

    const user = useSelector(state => state.user)
    const service = useSelector(state => state.options)
    const dispatch = useDispatch()
    
    const [form, setForm] = useState({});
    const [navigate, setNavigate] = useState(false);

    useEffect(() => {
        dispatch(getUser());

        setForm({
            ...user, 
            barber: 'any',
            haircut: '',
            request: ''});
    }, [dispatch, user]);

    const handleClick = () => {
        socket.emit('client', form);
        setNavigate(true);
    }

    return (
        <section className='join-queue'>
            {user && service &&
              <form id="queue-form">
                <div className="form-group">
                    <label htmlFor="barber">Barber</label>
                    <select 
                      id="barber" 
                      name="barber" 
                      onChange={(e) => {setForm({...form, barber: e.target.value})}}>
                        <option value="joe">Joe</option>
                        <option value="jane">Jane</option>
                        <option value="jim">Jim</option>
                        <option value="jill">Jill</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="haircut">Haircut</label>
                    <select 
                      id="haircut"
                      name="haircut"
                      onChange={e => {setForm({...form, haircut:e.target.value})}}>
                        <option value="fade">Fade</option>
                        <option value="buzzcut">Buzzcut</option>
                        <option value="crewcut">Crewcut</option>
                        <option value="mohawk">Mohawk</option>
                        <option value="afro">Afro</option>
                        <option value="bald">Bald</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="request">Special Request</label>
                    <textarea 
                      id="request" 
                      name="request" 
                      rows="4" 
                      cols="50" 
                      placeholder="Enter any special requests here..."
                      onChange={e => {setForm({...form, request:e.target.value})}}></textarea>
                </div>

                <button onClick={handleClick} className='button-signup' type="button">
                    Join Queue
                </button>

                {navigate && <Navigate to='/queue' />}
              </form>
            }

            {user && !service &&
                <form id="queue-form">
                    <div className="form-group">
                        <label htmlFor="Beautician">Beautician</label>
                        <input
                            id="Beautician"
                            name="Beautician"
                            type="text"
                            value={form.beautician}
                            onChange={(e) => { setForm({ ...form, beautician: e.target.value }) }} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Nail">Nail</label>
                        <select
                            id="Nail"
                            name="Nail"
                            onChange={e => { setForm({ ...form, nail: e.target.value }) }}>
                            <option value="fade">Fade</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="request">Special Request</label>
                        <textarea
                            id="request"
                            name="request"
                            rows="4"
                            cols="50"
                            placeholder="Enter any special requests here..."
                            onChange={e => { setForm({ ...form, request: e.target.value }) }}></textarea>
                    </div>

                    <button onClick={handleClick} className='button-signup' type="button">
                        Join Queue
                    </button>

                    {navigate && <Navigate to='/queue' />}
                </form>
            }

            {!user && <h1>{'please login/register before you queue up'}</h1>}
        </section>
    )
}

export default JoinQueue;