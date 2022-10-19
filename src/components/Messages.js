import React from 'react';

const Messages = (props)=>{

    return(
        <p className='msg' id='msg'>
            {props.msg}
        </p>
    );
}

export default Messages;