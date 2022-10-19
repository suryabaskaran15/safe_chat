import React, {createContext, useState } from 'react';
import FriendsList from '../components/FriendsList';
import MessageBlock from '../components/MessageBlock';
import 'bootstrap/dist/css/bootstrap.min.css';

export const reciverContext = createContext();
const MainScreen = ()=>{
    const [val,setval] = useState('Welcome');
    const getVal = (name)=>{
        setval(name);
    }
        return(
            <reciverContext.Provider value={val}>
            <div className=''>
                SAFE CHAT
            </div>
            <div className='maindiv'>
                <FriendsList get={getVal}/>
                <MessageBlock/>
            </div>
            </reciverContext.Provider>
        );
}
export default MainScreen;