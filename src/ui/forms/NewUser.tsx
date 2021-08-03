import React, { useState, useEffect } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';



interface FormValues {
    [index: string]: string | boolean | number | null | undefined,
    firstName: string,
    lastName: string,
    middleInitial?: string | null | undefined,
    active: boolean,
    district: number,
    email: string
}

interface Props {
    shown: boolean;
    selectedUser?: User | null | undefined;
    close: () => void;
    onConfirm?: () => void;
    createUser: (userInfo: FormValues) => void;
    editUser: (updateUserInfo: User) => void; 
}

const NewUserForm: React.FC<Props> = ({shown, selectedUser, close, onConfirm, createUser, editUser}: Props) => {
    const [formValues, setFormValues] = useState<FormValues>({
        firstName: selectedUser ? selectedUser.first_name : "",
        lastName: selectedUser ? selectedUser.last_name : "",
        middleInitial: selectedUser ? selectedUser.middle_initial : "",
        active: selectedUser ? selectedUser.active : false,
        district: selectedUser ? selectedUser.district : 1,
        email: selectedUser ? selectedUser.email : ""
    });

    useEffect(() => {
        setFormValues({
            firstName: selectedUser ? selectedUser.first_name : "",
            lastName: selectedUser ? selectedUser.last_name : "",
            middleInitial: selectedUser ? selectedUser.middle_initial : "",
            active: selectedUser ? selectedUser.active : false,
            district: selectedUser ? selectedUser.district : 1,
            email: selectedUser ? selectedUser.email : ""
        });
    }, [selectedUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === 'checkbox') {
            setFormValues({
                ...formValues,
                [e.target.name]: !formValues[e.target.name]
            });
        } else {
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (selectedUser) {
            const updatedUser: User = {
                ...selectedUser,
                first_name: formValues.firstName,
                last_name: formValues.lastName,
                middle_initial: formValues.middleInitial,
                active: formValues.active,
                district: formValues.district,
                email: formValues.email
            };

            editUser(updatedUser);
        } else {
            createUser(formValues);
        }
        close();
    };

    return (
        <Modal centered show={shown} onHide={close}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title tabIndex={0} aria-label={selectedUser ? `Edit ${selectedUser.first_name} ${selectedUser.last_name}'s profile` : "Create new user"}>{selectedUser ? `Edit ${selectedUser.first_name} ${selectedUser.last_name}` : `Create new user`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control aria-label="New user first name text input" required onChange={handleChange} type="text" name="firstName" value={formValues.firstName}/>
                        <Form.Control.Feedback type="invalid">
                            Please enter a first name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control aria-label="New user last name text input" required onChange={handleChange} type="text" name="lastName" value={formValues.lastName}/>
                        <Form.Control.Feedback type="invalid">
                            Please enter a last name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Middle Initial</Form.Label>
                        <Form.Control aria-label="New user middle initial text input" onChange={handleChange} type="text" maxLength={1} name="middleInitial" value={formValues.middleInitial ? formValues.middleInitial : ""}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control aria-label="New user email input" required onChange={handleChange} type="email" name="email" value={formValues.email ? formValues.email : ""}/>
                        <Form.Control.Feedback type="invalid">
                            Please enter an email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Active</Form.Label>
                        <Form.Check aria-label="New user is active check box input" onChange={handleChange} type="checkbox" name="active" value={formValues.firstName}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>District</Form.Label>
                        <Form.Control aria-label="New user district number input" required onChange={handleChange} type="number" name="district" value={formValues.district}/>
                    </Form.Group> 
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={close} variant="light">Cancel</Button>
                    <Button type='submit' variant={selectedUser ? "primary" : "success"} onClick={onConfirm}>{selectedUser ? "Save Changes" : "Create User"}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default NewUserForm;