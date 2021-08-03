import React from 'react';
import { ListGroupItem, Button} from 'react-bootstrap';

import './component-css/UserListItem.css';

interface Props {
    userData: User;
    deleteUser: (uid: number) => void;
    editUser: (user: User) => void;
}

const UserListItem: React.FC<Props> = ({userData, deleteUser, editUser}: Props) => {
    return (
        <ListGroupItem className="list-group-item" tabIndex={0} aria-label={`User ${userData.id} ${userData.first_name} ${userData.last_name}`} style={{marginBottom: '1rem', background: '#fff', border: '1px solid gray', padding: '1rem', borderRadius: "5px"}}>
            <div style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', alignItems: "center"}}>
                <div tabIndex={0} aria-label={`User i d ${userData.id}`} style={{width: '5%'}}>{userData.id}</div>
                <div tabIndex={0} aria-label={`User last name ${userData.last_name}`} style={{width: '20%'}}>{userData.last_name}</div>
                <div tabIndex={0} aria-label={`User first name ${userData.first_name}`} style={{width: '20%'}}>{userData.first_name}</div>
                <div tabIndex={0} aria-label={`User middle initial ${userData.middle_initial}`} style={{width: '5%'}}>{userData.middle_initial}</div>
                <div tabIndex={0} aria-label={`User district ${userData.district}`} style={{width: '20%'}}>{userData.district}</div>
                <div tabIndex={0} aria-label={`User verified ${userData.verified}`} style={{width: '10%'}}>{userData.verified ? "True" : "False"}</div>
                <div tabIndex={0} aria-label={`User created on ${userData.created_at}`} style={{width: '20%'}}>{userData.created_at}</div>
                <div className="edit-btns">
                    <Button className='edit-btn' variant='primary' onClick={() => editUser(userData)}>Edit</Button>
                    <Button variant='danger' onClick={() => deleteUser(userData.id)}>Delete</Button>
                </div>
            </div>
            {/* <div style={{marginLeft: 'auto', width: '10rem', display: 'flex', justifyContent: 'space-between', paddingRight: '2rem'}}>
                <button type="button" onClick={() => editUser(userData)}>Edit</button>
                <button type="button" onClick={() => deleteUser(userData.id)}>Delete</button>
            </div> */}
        </ListGroupItem>
    );
};

export default UserListItem;
