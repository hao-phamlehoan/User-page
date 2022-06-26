import React, {useState} from 'react'
import Reg from './Reg'
import Log from './Log'
import logo from '../../assets/HomePages_img/logo.png'
import avatar from '../../assets/HomePages_img/user-avatar-filled-alt.jpg'
import { HashLink as Link } from 'react-router-hash-link';
import {FaAlignJustify} from "react-icons/fa"
import {AiOutlineLogout} from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import {  useLocation } from 'react-router-dom';
import '../Homepage/Header.css'
import '../../routes/Home.css'

const Logout = () => {
    localStorage.clear()
}

const Header = ({Login}) => {
    const [showReg, setOpenReg] = useState(false)
    const [showLog, setOpenLog] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    if ("isLogined" in localStorage) Login = true
    return (
        <header id = "header">
            <div className = "m_container">
                <img src = {logo}></img>
                <div id = "mobile_menu">
                    <FaAlignJustify size = {40} id = "mobile_icon"/>
                    <div id = "header_nav">
                        <div className = "m_container">
                            <Link smooth to = "/#hero"><a>Home</a></Link>
                            <Link smooth to = "/#booth"><a>Booth</a></Link>
                            <Link smooth to = "/#organization"><a>Organization</a></Link>
                            <Link smooth to = "/#contact"><a>Contact</a></Link>
                        </div>
                    </div>
                </div>
                {Login ? (
                    <div id = "header_login">
                        <div className="header__navbar-user" onClick = {() => {if (location.pathname !== "/user") navigate(location.pathname + "user", { replace: true })}}>
                            <img src = {avatar} alt="" className="header-user-img" />
                            <span className="header-user-name">{JSON.parse(localStorage.getItem("user")).name}</span>
                        </div>
                        <Link smooth to = "/#hero"><AiOutlineLogout onClick = {Logout} size = {40} id = "logout_icon"/></Link>
                    </div>
                ) : (
                   <div id = "header_reg_log">
                        <div className = "reglog_container">
                            <span onClick = {()=>setOpenReg(true)} className = "reglog">Register</span>
                            <span onClick = {()=>setOpenLog(true)} className = "reglog">Login</span>
                        </div>
                    </div> 
                )}
            </div>
            {showReg && <Reg setOpenReg = {setOpenReg}/>}
            {showLog && <Log setOpenLog = {setOpenLog}/>}          
        </header>   
        
    );
}

export default Header