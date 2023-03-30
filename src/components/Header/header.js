import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Links from './Links/links';
import logo from '../Assets/Images/logo.svg';
import { getUser } from '../../redux/authenticate/authenticate';
import './header.scss';
import { useEffect, useState } from 'react';

function Header(props) {
    const location = useLocation();
    const [admin, setAdmin] = useState(false);
    const {user} = useSelector(state => state.auth0)
    const dispatch = useDispatch();

    // get user from redux store
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch, user])

    // set admin state to true if user is an admin
    useEffect(() => {
        setAdmin(user && user.admin ? true : false);
    }, [user])

    const { name, links, handleClick: menuClick, menu } = props;
    // !!still have to impliment the logic to check if the screen is mobile
    const mobile = true;

    // handle click for mobile menu button
    const handleClick = () => {
        menuClick(!menu)
    }
    
    if (location.pathname === '/login' || location.pathname === '/signup') 
    {
        //change main style to display: none
        document.querySelector('main').style.top = '0';
        document.querySelector('main').style.height = '100%';

        return null;
    }
     
    return (
        <header className={admin ? 'header-admin' : 'header'}>
            <Link to='/' >
                <img src={logo} alt='Cutting Edge Logo' />
            </Link>

            {mobile && !admin && <button onClick={handleClick} className="material-symbols-outlined">
                        menu
                    </button>
            }

            {admin && <Link to='/queue' className='admin-link'>
                        {user ? user.username : 'Admin'}
                    </Link>
            }

            {!mobile && !admin && <h1>{name}</h1>}
            
            {!mobile && !admin && <nav>
                <ul>
                    {links.map((link) => (
                        <li key={link.name}>
                            <Links isactive={false} path={link.path} name={link.name} onClick={handleClick} />
                        </li>))
                    }
                </ul>
            </nav>}
            
        </header>
    )
}

Header.propTypes = {
    name: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default Header;