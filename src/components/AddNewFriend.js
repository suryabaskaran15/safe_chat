import React,{useState} from 'react';
import { Button, Modal , ModalBody, ModalDialog, ModalFooter, ModalHeader } from 'react-bootstrap';

const AddNewFriend = (props)=>{
    const [show,setshow] = useState(props.show);
    // const handleShow = ()=>{setshow(true)};
    const handleClose = ()=>{setshow(false)};
    return(
        <Modal show={show} onHide={handleClose} size='sm'>
        <ModalHeader closeButton className='text-center font-weight-bold  '>
            ADD NEW FRIEND
        </ModalHeader>
        <ModalBody>
            <input type={'text'} className='container rounded' autoFocus/>
        </ModalBody>
        <ModalFooter className='text-center'>
             <Button variant='primary' onClick={handleClose}>ADD</Button>
        </ModalFooter>
    </Modal>
        
    );
}

export default AddNewFriend;