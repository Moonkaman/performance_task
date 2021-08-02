import React from 'react';
import { ListGroupItem } from 'react-bootstrap'; 

interface Props {
    userData: User;
    deleteUser: (uid: number) => void;
}

const UserListItem: React.FC<Props> = ({userData, deleteUser}: Props) => {
    if (userData.id === 1) {
        console.log(userData);
    }
    return (
        <ListGroupItem tabIndex={0} aria-label={`User ${userData.id} ${userData.first_name} ${userData.last_name}`} style={{marginBottom: '1rem', background: '#fff', border: '1px solid black', padding: '1rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', marginBottom: '0.5rem'}}>
                <div tabIndex={0} aria-label={`User i d ${userData.id}`} style={{width: '5%'}}>{userData.id}</div>
                <div tabIndex={0} aria-label={`User last name ${userData.last_name}`} style={{width: '20%'}}>{userData.last_name}</div>
                <div tabIndex={0} aria-label={`User first name ${userData.first_name}`} style={{width: '20%'}}>{userData.first_name}</div>
                <div tabIndex={0} aria-label={`User middle initial ${userData.middle_initial}`} style={{width: '5%'}}>{userData.middle_initial}</div>
                <div tabIndex={0} aria-label={`User district ${userData.district}`} style={{width: '20%'}}>{userData.district}</div>
                <div tabIndex={0} aria-label={`User verified ${userData.verified}`} style={{width: '10%'}}>{userData.verified ? "True" : "False"}</div>
                <div tabIndex={0} aria-label={`User created on ${userData.created_at}`} style={{width: '20%'}}>{userData.created_at}</div>
            </div>
            <div style={{marginLeft: 'auto', width: '10rem', display: 'flex', justifyContent: 'space-between', paddingRight: '2rem'}}>
                <button type="button">Edit</button>
                <button type="button" onClick={() => deleteUser(userData.id)}>Delete</button>
            </div>
        </ListGroupItem>
    );
};

export default UserListItem;
