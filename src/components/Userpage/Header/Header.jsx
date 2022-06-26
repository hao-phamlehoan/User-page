import logo from '../../../assets/User_img/logo.png'
import { FaAlignJustify } from "react-icons/fa"
import './header.css';
import avatar from '../../../assets/User_img/user-avatar-filled-alt.jpg'
import React from 'react';
import { useEffect } from 'react';
import callApi from '../../../api/callApi';



const Header = () => {
    const [user_avatar, setUser_avatar] = React.useState(avatar);
    const [user_name, setUser_name] = React.useState('')
    
    useEffect (() => {
        const fetchUser = async () => {
            try {
                // const user = await callApi.getUser(1);
                // setUser_name(user.result[0].name);
                var user = localStorage.getItem("user");
                setUser_name(JSON.parse(user).name)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fetchUser();
    }, [])
    return (
        <header id="header">
            <div className="m_container">
                <img src={logo} className="logo" alt='logo'></img>
                <div id="mobile_menu">
                    <FaAlignJustify size={40} id="mobile_icon" />
                    <div id="header_nav">
                        <div className="m_container">
                            <a href="#hero">Home</a>
                            <a href="#booth">Booth</a>
                            <a href="#contact">Contact</a>
                            <a href="#map">Map</a>
                        </div>
                    </div>
                </div>
                <div className="header__navbar-user">
                    <img src={user_avatar} alt="" className="header-user-img" />
                    <span className="header-user-name">{user_name}</span>
                    <ul className="header__navbar-user-menu">
                        <li className="header__navbar-user-item">
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            </div>
        </header>

    );
}

export {Header};