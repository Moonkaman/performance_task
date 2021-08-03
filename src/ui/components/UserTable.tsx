import React, {useEffect, useState} from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

import './component-css/UserTable.css';

import Filter from './Filter';
import UserListItem from './UserListItem';
import ConfirmationModal from './ConfirmationModal';
import NewUser from '../forms/NewUser';

// The two any types in here I couldn't figure out because it's a function returning a funciton and I didn't know
// how to represent that in typescript
interface ConfirmationModalState {
    shown: boolean;
    modalText: string;
    modalButtonText: {
        confirm: string,
        cancel: string
    };
    modalPrimaryButtonVariant: string;
    onConfirm?: any;
    modalHeader?: string;
}

interface UserModalState {
    shown: boolean,
    onConfirm?: any,
    selectedUser?: User
}

const UserTable: React.FC = () => {
    const [usersData, setUsersData] = useState<User[] | []>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
    const [currentFilterSettings, setCurrentFilterSettings] = useState({
        district: 1,
        active: true
    });

    const [confirmationModalState, setConfirmationModalState] = useState<ConfirmationModalState>({
        shown: false,
        modalText: "Test modal text",
        modalButtonText: {confirm: "Delete", cancel: "Cancel"},
        modalPrimaryButtonVariant: "danger"
    });

    const [userModalState, setUserModalState] = useState<UserModalState>({
        shown: false,
    });

    useEffect(() => {
        fetch('./users.json')
            .then(res => res.json())
            .then(data => setUsersData(data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        filterUsers({district: 1, active: false});
    }, [usersData]);

    const handleEditUser = (user: User) => {
        setUserModalState({
            ...userModalState,
            selectedUser: user,
            shown: true,
            onConfirm: editUser
        });
    };

    const handleDeleteUser = (uid: number) => {
        setConfirmationModalState({
            ...confirmationModalState,
            shown: true,
            modalButtonText: {confirm: "Delete User", cancel: "Cancel"},
            modalText: `Are you sure you want to delete user id:${uid}`,
            modalHeader: 'Delete User',
            onConfirm: () => {
                deleteUser(uid);
            }
        });
    };

    const deleteUser = (uid: number) => {
        setUsersData(usersData.filter(user => user.id !== uid));
        filterUsers(currentFilterSettings);
    };

    const createUser = (userInfo: UserInfo) => {
        const id = usersData.length;
        const newUser = {
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            email: userInfo.email,
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            active: userInfo.active,
            id,
            district: userInfo.district,
            middle_initial: userInfo.middleInitial ? userInfo.middleInitial : null,
            verified: false
        };

        setUsersData([
            ...usersData,
            newUser    
        ]);
        
        filterUsers(currentFilterSettings);
    };

    const editUser = (updatedUserInfo: User) => {
        setUsersData(usersData.map(user => {
            if (updatedUserInfo.id === user.id) {
                return {
                    ...updatedUserInfo
                };
            } else {
                return user;
            }
        }));
        filterUsers(currentFilterSettings);
    };

    const filterUsers = (options: {district: number, active: boolean}) => {
        setCurrentFilterSettings(options);
        setFilteredUsers(usersData.filter(user => {
            if (user.active === options.active && user.district === options.district) {
                return user;
            }
        }));
    };

    const handleConfirmationModalClose = () => {
        setConfirmationModalState({...confirmationModalState, shown: false});
    };

    const handleUserModalClose = () => {
        setUserModalState({...userModalState, shown: false});
    };

    return (
        <>
            <ConfirmationModal
                shown={confirmationModalState.shown}
                modalButtonText={confirmationModalState.modalButtonText}
                modalText={confirmationModalState.modalText}
                modalPrimaryButtonVariant={confirmationModalState.modalPrimaryButtonVariant}
                close={handleConfirmationModalClose}
                onConfirm={confirmationModalState.onConfirm}
                modalHeader={confirmationModalState.modalHeader}
            />
            <NewUser 
                shown={userModalState.shown}
                close={handleUserModalClose}
                selectedUser={userModalState.selectedUser}
                createUser={createUser}
                editUser={editUser}
            />
            <Card className="admin-user-table" style={{marginTop: '7rem'}}>
                <Card.Body>
                    <Filter filterUsers={filterUsers} />
                    
                    <div className='user-table-cont'>
                        <div className="user-table-heading">
                            <h2>Users</h2>
                            <Button variant="success" onClick={() => setUserModalState({shown: true})}>Add new user</Button>
                        </div>
                        <ListGroup variant="flush" style={{listStyle: 'none', paddingLeft: 0}}>
                            <ListGroup.Item style={{fontWeight: 700, borderBottom: '2px solid black', marginBottom: '1rem', padding: '1rem'}}>
                                <div style={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'center'}}>
                                    <div style={{width: '5%'}}>ID</div>
                                    <div style={{width: '20%'}}>Last Name</div>
                                    <div style={{width: '20%'}}>First Name</div>
                                    <div style={{width: '5%'}}>M.I.</div>
                                    <div style={{width: '20%'}}>District</div>
                                    <div style={{width: '10%'}}>Verified</div>
                                    <div style={{width: '20%'}}>Created</div>
                                </div>
                            </ListGroup.Item>
                            {
                                filteredUsers ? (
                                    filteredUsers.map(user => <UserListItem key={user.id} userData={user} deleteUser={handleDeleteUser} editUser={handleEditUser}/>)
                                ) : (
                                    usersData.map(user => <UserListItem key={user.id} userData={user} deleteUser={handleDeleteUser} editUser={handleEditUser}/>)
                                )
                            }
                        </ListGroup>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default UserTable;