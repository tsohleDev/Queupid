import { useState, useEffect } from 'react';
import { getUser } from '../../redux/authenticate/authenticate';
import { useSelector, useDispatch } from 'react-redux';
import { appendToQueue } from '../../redux/queue/queue';
import url from '../../url';
import io from 'socket.io-client';
import './form.scss'
import { Link, Navigate } from 'react-router-dom';

const socket = io(url);

function JoinQueue() {
    const {user} = useSelector(state => state.auth0)
    const clients = useSelector(state => state.queue)
    const service = useSelector(state => state.options)
    const dispatch = useDispatch()
    
    const [form, setForm] = useState({});
    const [navigate, setNavigate] = useState(false);

    useEffect(() => {
        dispatch(getUser());

        setForm({
            ...user, 
            service,
            onSeat: false,
            barber: 'any',
            style: 'fade',
            request: ''});
    }, [dispatch, user]);

    const handleClick = () => {
        if (clients.find(c => c.id === form.id)) {
            console.log('update');
            socket.emit('update', form);
            setNavigate(true);
            return;
        }

        console.log('client');
        socket.emit('client', form);
        dispatch(appendToQueue(form))
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
                        <option value="ntsako">Ntsako</option>
                        <option value="zamo">Zamo</option>
                        <option value="nqobile">Nqobile</option>
                        <option value="thabo">Thabo</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="haircut">Haircut</label>
                    <select 
                      id="haircut"
                      name="haircut"
                      onChange={e => {setForm({...form, style:e.target.value})}}>
                        <option value="Standard Haircut">Standard Haircut</option>
                        <option value="Cut and Dye">Cut and Dye</option>
                        <option value="Cut and Hair Dye Fibrecut">Cut and Hair Dye Fibre</option>
                        <option value="Cut and Bleach">Cut and Bleach</option>
                        <option value="Chiskop razor">Chiskop razor</option>
                        <option value="Chiskop clipper">Chiskop clipper</option>
                        <option value="Beard shave razor">Beard shave razor</option>
                        <option value="Beard clipper">Beard clipper</option>
                        <option value="Edge Up">Edge Up</option>
                        <option value="Line Up">Line Up</option>
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

            {!user && 
            
            <div>
                <h1>{'please login/register before you queue up'}</h1>

                <Link to='/login'> Login </Link>
            </div>}
        </section>
    )
}

export default JoinQueue;