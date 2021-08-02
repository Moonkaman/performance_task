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
        <ListGroupItem style={{marginBottom: '1rem', background: '#fff', border: '1px solid black', padding: '1rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', marginBottom: '0.5rem'}}>
                <div style={{width: '5%'}}>{userData.id}</div>
                <div style={{width: '20%'}}>{userData.last_name}</div>
                <div style={{width: '20%'}}>{userData.first_name}</div>
                <div style={{width: '5%'}}>{userData.middle_initial}</div>
                <div style={{width: '20%'}}>{userData.district}</div>
                <div style={{width: '10%'}}>{userData.verified ? "True" : "False"}</div>
                <div style={{width: '20%'}}>{userData.created_at}</div>
            </div>
            <div style={{marginLeft: 'auto', width: '10rem', display: 'flex', justifyContent: 'space-between', paddingRight: '2rem'}}>
                <button type="button">Edit</button>
                <button type="button" onClick={() => deleteUser(userData.id)}>Delete</button>
            </div>
        </ListGroupItem>
    );
};

export default UserListItem;
