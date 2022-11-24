import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
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
        const verify = (await getDoc(doc(db,'user',id))).data();
        if(verify){
        await updateDoc(doc(db,'user',userId), {
            friends_list: arrayUnion(id)
        });
        // await setDoc(doc(db, "user", userId,"messages",id),{
        //     messages : []
        // })
        props.add();
        }
        else{
            alert('No frd found.pls enter correct id...!');
        }
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