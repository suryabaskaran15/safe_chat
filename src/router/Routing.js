import { Routes,Route } from "react-router-dom";
import Login from "../screen/Login";
import CreateNewUser from "../screen/CreateNewUser";
import ForgotPassword from "../screen/ForgotPassword";
import MainScreen from "../screen/MainScreen";

const Routing = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path = "/Create" element ={<CreateNewUser/>} />
            <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
            <Route path='/:userId/messaging' element={<MainScreen/>}/>
        </Routes>
    );
}

export default Routing;