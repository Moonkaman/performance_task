import React from 'react';

import { Modal, Button } from 'react-bootstrap';

interface Props {
    shown: boolean;
    modalText: string;
    modalButtonText: {confirm: string, cancel: string};
    modalPrimaryButtonVariant: string;
    modalHeader?: string;
    close: () => void;
    onConfirm?: () => void;
}

const ConfirmationModal: React.FC<Props> = ({shown, modalText, modalButtonText, modalPrimaryButtonVariant, modalHeader, close, onConfirm}: Props) => {
    return (
        <Modal centered show={shown} onHide={close}>
            <Modal.Header closeButton>
                {modalHeader}
            </Modal.Header>
            <Modal.Body>
                {modalText}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} variant={"light"}>{modalButtonText.cancel}</Button>
                <Button onClick={() => {
                    if (onConfirm) {
                        onConfirm();
                    }
                    close();
                }} variant={modalPrimaryButtonVariant}>{modalButtonText.confirm}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
