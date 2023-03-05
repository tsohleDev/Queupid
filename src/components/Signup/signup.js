import logo from '../Assets/Images/logo.svg';
import FormGroup from '../Login/FormGroup/formGroup';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {authenticate} from '../../redux/authenticate/authenticate';
import { Navigate } from "react-router-dom";
import '../Login/login.scss';

function Signup() {
    const {user, loading, ok} = useSelector(state => state.auth0)
    const [onRender, setOnRender] = useState(true)
    const [form, setForm] = useState({username:'',firstname:'', lastname:'', cell:'', email:'' , sex:'', age:23, dob:'', secret:'', confirmPassword:'' });
    const [submited, setSubmited] = useState(false)
    const [alert, setAlert] = useState('empty form');

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    const handleSubmit = () => {
        setAlert(null);

        const keys = Object.keys(form);
        const values = Object.values(form);

        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            
            if (!value) {
                setAlert({type:keys[i], message:'Please fill up all fields'});
                console.log('value');
                break;
            } else if (keys[i] === 'email') {
                const mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

                if (!value.match(mail)) { 
                    setAlert({type:'email', message:'Please enter a valid email e.g "john@mail.com"'});
                    break;
                }
            } else if (keys[i] === 'secret') {
                const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

                if (!value.match(passw)) { 
                    setAlert({type:'secret', message:'Your password should be between 8 to 15 characters with at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'});
                    break;
                }
            } else if (keys[i] === 'confirmPassword') {
                if (form.secret !== value) {
                    setAlert({type:'confirmPassword', message:'Passwords do not match'});
                    break;
                }
            } else if (keys[i] === 'cell') {
                const cell = /^\d{10}$/

                if (!value.match(cell)) { 
                    setAlert({type:'cell', message:'Please enter a valid cell number e.g "0123456789"'});
                    break;
                }
            }
        }
    }

    useEffect(() => {
        if (!onRender && ok) setSubmited(true)
        else if (!onRender && !loading && !ok) {
            setAlert({type:'username', message:`username already exists, try ${form.username}${Math.floor(Math.random() * 100)}`})
        } 

        setOnRender(false)
    }, [loading, user])

    useEffect(() => {
        const values = Object.values(form);
        if (!alert && values.every(Boolean)) {
            console.log('dispatch');
            dispatch(authenticate({form, method:'register'}));
        }
    }, [alert]);
    
    
    if (submited) return <Navigate to="/" replace/>;

    return (
        <section id='register-page'>
            <img src={logo} alt='Cutting Edge Logo' />

            <form>
                <FormGroup alert={alert} handleChange={handleChange} tag='username' label='Username'/>
                <FormGroup alert={alert} handleChange={handleChange} tag='firstname' label='First Name'/>
                <FormGroup alert={alert} handleChange={handleChange} tag='lastname' label='Last Name'/>
                <FormGroup alert={alert} handleChange={handleChange} tag='cell' label='Cell'/>
                <FormGroup alert={alert} handleChange={handleChange} tag='email' label='Email'/>
                <FormGroup alert={alert} handleChange={handleChange} tag='sex' label='Gender'/>
                <FormGroup alert={alert} handleChange={handleChange} tag='dob' label='Date of Birth'/>
                <FormGroup alert={alert} handleChange={handleChange} tag='secret' label='Password'/>
                <FormGroup alert={alert} handleChange={handleChange} tag='confirmPassword' label='Confirm Password'/>

                {!loading && <button className='button-signup register' type="button"
                onClick={handleSubmit}>Signup</button>}

                {loading && <button className='button-signup' type="button">
                    Loading...
                </button>}
            </form>
        </section>
    )
}

export default Signup;