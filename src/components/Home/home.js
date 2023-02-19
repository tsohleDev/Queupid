import { Link } from 'react-router-dom';
import { getUser } from '../../redux/user/user';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import logo from '../Assets/Images/logo.svg';
import './home.scss';

function Home() {
    const [admin, setAdmin] = useState(false);
    const user = useSelector(state => state.user)
    const menuToogle = useSelector(state => state.menuToogle)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    useEffect(() => {
        setAdmin(user && user.admin)

        console.log('menus',menuToogle);

    }, [user])

    return (
        <section id='home'>
            <img src={logo} alt='Cutting Edge Logo' />

            <button>
                {!admin && 
                  <Link to='/join-queue'>
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