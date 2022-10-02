import React, { Component } from 'react';
import {IoMdArrowRoundBack} from 'react-icons/io';

class MsgHeader extends Component{
    render(){
        return(
            <div class='msgHeader'>
                <IoMdArrowRoundBack size={40}/>
                <label id='msg-reciver'>gff</label>
            </div>
        );
    }
}

export default MsgHeader;