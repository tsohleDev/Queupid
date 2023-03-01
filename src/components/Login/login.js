import logo from '../Assets/Images/logo.svg';
import FormGroup from './FormGroup/formGroup';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import '../JoinQueue/form.scss';
import './login.scss'
import { authenticate } from '../../redux/authenticate/authenticate';
import { useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function Login() {
    const authenticator = useSelector(state => state.signin)
    const [form, setForm] = useState({username:'', password:''});
    const [submited, setSubmited] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authenticate(form));
        const {username, password} = form;

        //setSubmited(true)
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    if (submited) return <Navigate to="/" replace/>;
    
    return (
        <section id='login-page'>
            <img src={logo} alt='Cutting Edge Logo'/>

            <form >
                <FormGroup handleChange={handleChange} tag='username' label='Username'/>
                <FormGroup handleChange={handleChange} tag='secret' label='Password'/>

                <button className='button-signup' type="submit"
                onClick={handleSubmit}>Login</button>
            </form>

            <Link to="/signup"> Create a new account </Link>
        </section>
    )
}

export default Login;