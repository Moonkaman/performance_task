import React from 'react';

interface Props {
    userData: User;
}

const UserListItem: React.FC<Props> = ({userData}: Props) => {
    if (userData.id === 1) {
        console.log(userData);
    }
    return (
        <li style={{fontWeight: 700, borderBottom: '2px solid black', marginBottom: '1rem', padding: '1rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'center'}}>
                <div style={{width: '5%'}}>{userData.id}</div>
                <div style={{width: '20%'}}>{userData.last_name}</div>
                <div style={{width: '20%'}}>{userData.first_name}</div>
                <div style={{width: '5%'}}>{userData.middle_initial}</div>
                <div style={{width: '20%'}}>{userData.district}</div>
                <div style={{width: '10%'}}>{userData.verified ? "True" : "False"}</div>
                <div style={{width: '20%'}}>{userData.created_at}</div>
            </div>
        </li>
    );
};

export default UserListItem;
