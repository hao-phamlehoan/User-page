import React, { useState } from 'react'
import Reg from './Reg'
import Log from './Log'
import logo from '../../assets/HomePages_img/logo.png'
import avatar from '../../assets/HomePages_img/user-avatar-filled-alt.jpg'
import { HashLink as Link } from 'react-router-hash-link';
import { FaAlignJustify } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import '../Homepage/Header.css'
import '../../routes/Home.css'

const Logout = () => {
    localStorage.clear()
}

const Header = ({ Login }) => {
    const [showReg, setOpenReg] = useState(false)
    const [showLog, setOpenLog] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    if ("isLogined" in localStorage) Login = true

    function getNickName() {
        if (localStorage.getItem("admin") == "true") return "ADMIN";
        var nameRe = JSON.parse(localStorage.getItem("user")).representation
        var Namearr = nameRe.split(' ')
        return Namearr[Namearr.length - 1];
      }
    return (
        <header id="header">
            <div className="m_container">
                <img src={logo}></img>
                <div id="mobile_menu">
                    <FaAlignJustify size={40} id="mobile_icon" />
                    <div id="header_nav">
                        <div className="m_container">
                            <Link smooth to="User-page/#hero"><p>Home</p></Link>
                            <Link smooth to="User-page/#booth"><p>Booth</p></Link>
                            <Link smooth to="User-page/#organization"><p>Organization</p></Link>
                            <Link smooth to="User-page/#contact"><p>Contact</p></Link>
                        </div>
                    </div>
                </div>
                {Login ? (
                    <div id="header_login">
                        <div className="header__navbar-user" onClick={() => {
                            if (location.pathname !== "/User-page/user" && localStorage.getItem("admin") == "false") navigate("/User-page/user", { replace: true })
                            else if (location.pathname !== "/User-page/admin" && localStorage.getItem("admin") == "true") navigate("/User-page/admin", { replace: true })
                        }}>
                            <img src={avatar} alt="" className="header-user-img" />
                            <span className="header-user-name">{getNickName()}</span>
                            <Link smooth to="/User-page/">
                                <ul className="header__navbar-user-menu">
                                    <li onClick={Logout} className="header__navbar-user-item">
                                        Log out
                                    </li>
                                </ul>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div id="header_reg_log">
                        <div className="reglog_container">
                            <span onClick={() => setOpenReg(true)} className="reglog">Register</span>
                            <span onClick={() => setOpenLog(true)} className="reglog">Login</span>
                        </div>
                    </div>
                )}
            </div>
            {showReg && <Reg setOpenReg={setOpenReg} />}
            {showLog && <Log setOpenLog={setOpenLog} />}
        </header >

    );
}

export default Header