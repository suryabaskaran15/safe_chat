import { Routes,Route } from "react-router-dom";
import Login from "../components/Login";
import CreateNewUser from "../components/CreateNewUser";
import ForgotPassword from "../components/ForgotPassword";

const Routing = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path = "/Create" element ={<CreateNewUser/>} />
            <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        </Routes>
    );
}

export default Routing;