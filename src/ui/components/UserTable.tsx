import React, {useEffect, useState} from 'react';

import Filter from './Filter';
import UserListItem from './UserListItem';

const UserTable: React.FC = () => {
    const [usersData, setUsersData] = useState<User[] | []>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);

    useEffect(() => {
        fetch('./users.json')
            .then(res => res.json())
            .then(data => setUsersData(data))
            .catch(err => console.log(err));
    }, []);

    const handleEditUser = () => {
        console.log('');
    };

    const handleDeleteUser = () => {
        console.log('');
    };

    const filterUsers = (options: {district: number, active: boolean}) => {
        setFilteredUsers(usersData.filter(user => {
            if (user.active === options.active && user.district === options.district) {
                return user;
            }
        }));
    };

    return (
        <div className="admin-user-table" style={{marginTop: '7rem'}}>
            <Filter filterUsers={filterUsers} />
            
            <div style={{border: '1px solid black', width: '50rem', marginTop: '2rem'}}>
                <h2 style={{textAlign: 'center', textDecoration: 'underline'}}>Users</h2>
                <ul style={{listStyle: 'none', paddingLeft: 0, height: '30rem'}}>
                    <li style={{fontWeight: 700, borderBottom: '2px solid black', marginBottom: '1rem', padding: '1rem'}}>
                        <div style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'center'}}>
                            <div style={{width: '5%'}}>ID</div>
                            <div style={{width: '20%'}}>Last Name</div>
                            <div style={{width: '20%'}}>First Name</div>
                            <div style={{width: '5%'}}>M.I.</div>
                            <div style={{width: '20%'}}>District</div>
                            <div style={{width: '10%'}}>Verified</div>
                            <div style={{width: '20%'}}>Created</div>
                        </div>
                    </li>
                    {
                        filteredUsers ? (
                            filteredUsers.map(user => <UserListItem key={user.id} userData={user} />)
                        ) : (
                            usersData.map(user => <UserListItem key={user.id} userData={user} />)
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default UserTable;