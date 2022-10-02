import React from 'react';
import FriendsList from '../components/FriendsList';
import MessageBlock from '../components/MessageBlock';
import { useLocation } from 'react-router-dom';
import AddNewFriend from '../components/AddNewFriend';

const MainScreen = ()=>{

        return(
            <>
            <div class='maindiv'>
                <FriendsList/>
                {/* <AddNewFriend/> */}
                <MessageBlock/>
            </div>
            </>
        );
}

export default MainScreen;