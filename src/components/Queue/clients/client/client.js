import { Link } from 'react-router-dom';
import female from '../../../Assets/Images/female.svg';
import './client.scss'

function Client(props) {

    const { client, admin } = props;
    const { username } = client;

    return (
        <div className="client">
            <img src={female} alt='Client' />

            <h3>{username}</h3>
            
            {admin &&
                <button>
                    <Link to={`/profile/${client.id}`} class="material-symbols-outlined">
                    more_vert
                    </Link>
                </button>
            }

        </div>
    )
    
}

export default Client;