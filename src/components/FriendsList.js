import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsFillPersonPlusFill} from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import AddNewFriend from './AddNewFriend';
import { db } from "../firebase_db";
import { doc, getDoc } from "firebase/firestore";
import MsgHeader from './MsgHeader';

const FriendsList = (props)=>{

    const {userId} = useParams();
    const [show,setshow] = useState(props.show);
    const [friendList,setfriendList] = useState([]);
    const [flag,setflag] = useState(false);
    const handle = (value)=>{
        setshow(value);
        setflag(!flag);
    }
    const getFriendsList = async()=>{
            let user = (await getDoc(doc(db,'user',userId))).data();
            setfriendList(user.friends_list);
        }
    useEffect(()=>{
        getFriendsList();
    },[flag]);
    return(
        <div className='outerdiv friendList row '>
            <h2 id='ourId' className={'col container h-25 text-center rounded'}>{userId}</h2>
            <div className={"row"}>
                <ul>
                    {
                        friendList.map((res)=>
                            <li key={res} onClick={()=>props.get(res)} >{res}</li>
                        )
                    }
                </ul>
            </div>
            <BsFillPersonPlusFill onClick={()=>handle(true)}  size={30} className='col-12'/>
            {show &&
                <AddNewFriend display={show} get={handle}/>
            }
            
        </div>
    );
}

export default FriendsList;