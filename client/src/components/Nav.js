import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import { logout } from "../actions/authActions";

function Nav() {

    const dispatch = useDispatch()

    const openLogin = () => setModal({...modal, login: true})
    const openRegister = () => setModal({...modal, register: true})

    const handleCloseModal = () => setModal({...modal,login: false, register: false})
    
    const [modal, setModal] = useState({login: false, register: false})
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.auth.user)
    
    return (
        <>
        <nav>
            <ul>
                <li>MERN SHOPPING LIST APP</li>
                {isAuthenticated 
                ?
                <div>
                    <li>Welcome {user.name} </li>
                    <button style={{color: "red"}} onClick={() => dispatch(logout())}>Logout</button>
                </div>    
                :
                <div>
                    <button onClick={openLogin}>Login</button>
                    <button onClick={openRegister}>Register</button>
                </div>
                }
            </ul>
        </nav>
        <RegisterModal modal={modal.register} handleCloseModal={handleCloseModal} />
        <LoginModal modal={modal.login} handleCloseModal={handleCloseModal} />
        </>
    )
}

export default Nav
