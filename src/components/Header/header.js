import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toogle, writeHomeRoute } from '../../redux/menutoogle/menutoogle';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Links from './Links/links';
import logo from '../Assets/Images/logo.svg';
import { getUser } from '../../redux/user/user';
import './header.scss';
import { useEffect, useState } from 'react';

function Header(props) {
    const location = useLocation();
    const {path, openMenu} = useSelector(state => state.menuToogle);
    const [admin, setAdmin] = useState(false);
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    useEffect(() => {
        setAdmin(user && user.admin);
    }, [user])

    const { name, links } = props;
    const mobile = true;

    const handleClick = () => {
        dispatch(toogle(!openMenu));

        if (openMenu && location.pathname !== '/menu') dispatch(writeHomeRoute(location.pathname));
        if (!openMenu) {console.log(path, 'yu');}
        //navigate.replace(path, { state: { from: 'previousPage' } });
    }
    
    if (location.pathname === '/login' || location.pathname === '/signup') return null;
     
    return (
        <header className={admin ? 'header-admin' : 'header'}>
            <Link to='/' >
                <img src={logo} alt='Cutting Edge Logo' />
            </Link>

            {mobile && !admin && <Link to={openMenu ? path : '/menu'} onClick={handleClick} className="material-symbols-outlined">
                        menu
                    </Link>
            }

            {admin && <Link to='/queue' className='admin-link'>
                        {user.username}
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