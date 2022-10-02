import React from 'react';

const Messages = (props)=>{
    const Line_Break = document.createElement('br');
    const get_msg = props.msg;
    let msg = [];
    const addLineBreak = ()=>{
        msg = get_msg.split(' ');
        for (let i = 0; i < msg.length; i++){
            if(i%6 == 0){
                msg.splice(i,0,Line_Break);
            }
        }
        const final_msg = msg.join(' ');
        return final_msg;
    }
    return(
        <p className='msg' id='msg'>
            {addLineBreak()}
        </p>
    );
}

export default Messages;