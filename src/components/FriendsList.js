import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsFillPersonPlusFill} from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader } from 'react-bootstrap';

const FriendsList = ()=>{
    const {userId} = useParams();
    const [show,setshow] = useState(false);

    const handleShow = ()=>{setshow(true)};
    const handleClose = ()=>{setshow(false)};
    return(
        <div class='outerdiv friendList row '>
            <h2 id='ourId' className={'col container h-25 text-center rounded'}>{userId}</h2>
            <div className={"row"}>
                <ul>

                </ul>
            </div>
            <BsFillPersonPlusFill onClick={handleShow}  size={30} class='col-12'/>
            <Modal show={show} onHide={handleClose} size='sm'>
                <ModalHeader closeButton className='text-center font-weight-bold  '>
                    ADD NEW FRIEND
                </ModalHeader>
                <ModalBody>
                    <input type={'text'} className='container rounded' placeholder='Enter your Friend userId' autoFocus/>
                </ModalBody>
                <ModalFooter className='text-center'>
                     <Button variant='primary' onClick={handleClose}>ADD</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default FriendsList;