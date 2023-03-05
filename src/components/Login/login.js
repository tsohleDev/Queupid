import logo from '../Assets/Images/logo.svg';
import FormGroup from './FormGroup/formGroup';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../JoinQueue/form.scss';
import './login.scss'
import { authenticate } from '../../redux/authenticate/authenticate';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

function Login() {
    const {user, loading, ok} = useSelector(state => state.auth0)
    const [form, setForm] = useState({username:'', secret:''});
    const [onRender, setOnRender] = useState(true)
    const [alert, setAlert] = useState(null);
    const [submited, setSubmited] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authenticate({form, method:'login'}));
    }

    useEffect(() => {
        if (!onRender && ok) setSubmited(true) 
        else if (!onRender && !loading && !ok) {
            setAlert({type:'username',message:'Invalid username or password'})
        }

        setOnRender(false)
    }, [loading, user])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    if (submited) return <Navigate to="/" replace/>;
    
    return (
        <section id='login-page'>
            <img src={logo} alt='Cutting Edge Logo'/>

            <form >
                <FormGroup alert={alert} handleChange={handleChange} tag='username' label='Username'/>
                <FormGroup handleChange={handleChange} tag='secret' label='Password'/>

                {!loading && <button className='button-signup' type="submit"
                onClick={handleSubmit}>Login</button>}
                
                {loading && <button className='button-signup' type="button">
                    Loading...
                </button>}
                
            </form>

            <Link to="/signup"> Create a new account </Link>
        </section>
    )
}

export default Login;