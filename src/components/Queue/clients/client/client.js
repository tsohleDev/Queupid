import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import female from '../../../Assets/Images/female.svg';
import './client.scss'

function Client(props) {
    const { user } = useSelector(state => state.auth0);

    const { client, admin } = props;
    const { username } = client;

    const isUser = () => {
       return user && user.username === username ? 'client user' : 'client';
    }
    
    return (
        <div className={isUser()}>
            <img src={female} alt='Client' />

            <h3>{username}</h3>
            
            {admin &&
                <button>
                    <Link to={`/profile/${client.id}`} className="material-symbols-outlined">
                    more_vert
                    </Link>
                </button>
            }

        </div>
    )
    
}

export default Client;