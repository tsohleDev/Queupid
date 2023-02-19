import Client from "./client/client";

function Clients(props) {
    const clients = [{
        id: 1,
        username: 'Joe',
        cell: '555-555-5555',
        email: 'mike#mike.com',
        haircut: 'Fade',
        request: 'No beard trim'
    }, {
        id: 2,
        username: 'Jane',
        cell: '555-555-5555',
        email: 'mike#mike.com',
        haircut: 'Buzzcut',
        request: 'No beard trim'
    }, {
        id: 3,
        username: 'Jim',
        cell: '555-555-5555',
        email: 'mike#mike.com',
        haircut: 'Crewcut',
        request: 'No beard trim'
    }];

    const { admin } = props;

    console.log(clients);
    
    return (
        <div className="clients">
            {clients.map(client => <Client key={client.id} admin={admin} client={client} />)}
        </div>
    )
}

export default Clients;