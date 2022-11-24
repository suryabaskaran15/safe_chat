import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsFillPersonPlusFill} from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import AddNewFriend from './AddNewFriend';
import { db } from "../firebase_db";
import { doc, getDoc} from "firebase/firestore";

const FriendsList = (props)=>{

    const {userId} = useParams();
    const [show,setshow] = useState();
    const [friendList,setfriendList] = useState([]);
    const [flag,setflag] = useState(false);
    
    const handle = (value)=>{
        setshow(value);
    }
    const added = ()=>{
        setflag(!flag);
    }
    const getFriendsList = async()=>{
            let user_friennds = (await getDoc(doc(db,'user',userId))).data().friends_list;
            setfriendList(user_friennds);
        }
    useEffect(()=>{
        getFriendsList();
    },[flag]);
    return(
        <div className='outerdiv friendList row '>
            <h2 id='ourId' className='col-12 container text-center'>{userId}</h2>
            <div>
                <ul>
                    {
                        friendList.map((res)=>
                            <li className='col-12' key={res} onClick={()=>props.get(res)} >
                                {res}
                            </li>
                        )
                    }
                </ul>
            </div>
            <BsFillPersonPlusFill onClick={()=>handle(true)}  size={30} className='col-12'/>
            {show &&
                <AddNewFriend display={show} get={handle} add={added}/>
            }
            
        </div>
    );
}

export default FriendsList;