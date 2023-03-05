import Client from "./client/client";

function Clients(props) {
    const { admin, clients } = props;
    
    return (
        <div className="clients">
            {clients.map(client => <Client key={client.id} admin={admin} client={client} />)}
        </div>
    )
}

export default Clients;