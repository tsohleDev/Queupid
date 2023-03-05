import { Link } from 'react-router-dom';
import { getUser } from '../../redux/authenticate/authenticate';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import logo from '../Assets/Images/logo.svg';
import './home.scss';

function Home() {
    const [admin, setAdmin] = useState(false);
    const {user} = useSelector(state => state.auth0)
    const dispatch = useDispatch();

    //get user from redux store
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    //set admin state to true if user is an admin
    useEffect(() => {
        setAdmin(user && user.admin ? true : false);
    }, [user])

    return (
        <section id='home'>
            <img src={logo} alt='Cutting Edge Logo' />

            <button>
                {!admin && 
                  <Link to='/options'>
                    Join Queue
                  </Link>
                }
                {admin &&
                    <Link to='/queue'>
                        Manage Queue
                    </Link>
                }
            </button>
        </section>
    )
}

export default Home;