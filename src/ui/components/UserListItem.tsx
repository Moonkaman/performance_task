import React from 'react';

interface Props {
    userData: User;
}

const UserListItem: React.FC<Props> = ({userData}: Props) => {
    if (userData.id === 1) {
        console.log(userData);
    }
    return (
        <li style={{marginBottom: '2rem', background: '#fff', border: '1px solid black', padding: '1rem'}}>
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
                <button type="button">Delete</button>
            </div>
        </li>
    );
};

export default UserListItem;
