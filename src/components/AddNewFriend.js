import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { db } from '../firebase_db';

const AddNewFriend = (props) => {
    const { userId } = useParams();
    const [show, setshow] = useState(props.display);

    const handle = (val) => {
        setshow(val);
        props.get(val);
    }
    const add_to_db = async(id) => {
        await updateDoc(doc(db,'user',userId), {
            friends_list: arrayUnion(id)
        });
    }
    return (
        <Modal show={show} onHide={() => handle(false)} size='sm'>
            <ModalHeader closeButton className='text-center font-weight-bold  '>
                ADD NEW FRIEND
            </ModalHeader>
            <ModalBody>
                <input type={'text'} id='friendId' className='container rounded' autoFocus />
            </ModalBody>
            <ModalFooter className='text-center'>
                <Button variant='primary' onClick={
                    () => {
                        add_to_db(document.getElementById('friendId').value);
                        handle(false);
                    }}>ADD</Button>
            </ModalFooter>

        </Modal>

    );
}

export default AddNewFriend;