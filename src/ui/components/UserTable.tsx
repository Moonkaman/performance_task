import React, {useEffect, useState} from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import './component-css/UserTable.css';

import Filter from './Filter';
import UserListItem from './UserListItem';
import ConfirmationModal from './ConfirmationModal';

interface ModalState {
    shown: boolean;
    modalText: string;
    modalButtonText: {
        confirm: string,
        cancel: string
    };
    modalPrimaryButtonVariant: string;
    onConfirm?: any;
}

const UserTable: React.FC = () => {
    const [usersData, setUsersData] = useState<User[] | []>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
    const [confirmationModalState, setConfirmationModalState] = useState<ModalState>({
        shown: true,
        modalText: "Test modal text",
        modalButtonText: {confirm: "Delete", cancel: "Cancel"},
        modalPrimaryButtonVariant: "danger"
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

    const handleEditUser = () => {
        console.log('');
    };

    const handleDeleteUser = (uid: number) => {
        setConfirmationModalState({
            ...confirmationModalState,
            shown: true,
            modalButtonText: {confirm: "Delete User", cancel: "Cancel"},
            modalText: `Are you sure you want to delete user id:${uid}`,
            onConfirm: () => {
                deleteUser(uid);
                console.log("Click");
            }
        });
    };

    const deleteUser = (uid: number) => {
        setUsersData(usersData.filter(user => user.id !== uid));
        setFilteredUsers(usersData.filter(user => user.id !== uid));
    };

    const filterUsers = (options: {district: number, active: boolean}) => {
        console.log("Filtering for district " + options.district);
        setFilteredUsers(usersData.filter(user => {
            if (user.active === options.active && user.district === options.district) {
                return user;
            }
        }));
    };

    const handleModalClose = () => {
        setConfirmationModalState({...confirmationModalState, shown: false});
    };

    return (
        <>
            <ConfirmationModal
                shown={confirmationModalState.shown}
                modalButtonText={confirmationModalState.modalButtonText}
                modalText={confirmationModalState.modalText}
                modalPrimaryButtonVariant={confirmationModalState.modalPrimaryButtonVariant}
                close={handleModalClose}
                onConfirm={confirmationModalState.onConfirm}
            />
            <Card className="admin-user-table" style={{marginTop: '7rem'}}>
                <Card.Body>
                    <Filter filterUsers={filterUsers} />
                    
                    <div className='user-table-cont'>
                        <h2>Users</h2>
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
                                    filteredUsers.map(user => <UserListItem key={user.id} userData={user} deleteUser={handleDeleteUser} />)
                                ) : (
                                    usersData.map(user => <UserListItem key={user.id} userData={user} deleteUser={handleDeleteUser} />)
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