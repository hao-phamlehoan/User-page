import React, {useState, useEffect } from 'react'
import Axios from 'axios'
import {useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode"
import './RegLog.css'

const checkExistedEmail = (email) => {
    return (
        Axios.get('https://jfresgister-booth-api.herokuapp.com/business/all')
        .then(res => {
            return res.data.result.map((user) => {return user.email}).indexOf(email)
        })
    )
}

const saveToken = (tokenDetails) => {
    localStorage.setItem('user', JSON.stringify(tokenDetails.user))
    localStorage.setItem('admin', JSON.stringify(tokenDetails.isAdmin))
    localStorage.setItem('isLogined', 'true')
}

const Log = ({setOpenLog}) => {
    const navigate = useNavigate()
    const location = useLocation()

    //LogIn with mail
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    function handle(e) {
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    function login(e) {
        e.preventDefault()
        Axios.post("https://jfresgister-booth-api.herokuapp.com/account/login", {
            email: data.email,
            password: data.password
        })
        .then(res => {
            // console.log(res)
            if (!res.data.status) {
                alert("Wrong Email or Password!!!\nPlease try again")
            }
            else {
                saveToken(res.data)
                if (localStorage.getItem("admin") == "false") navigate(location.pathname + "user", { replace: true })
                else navigate(location.pathname + "admin", { replace: true })
                setOpenLog(false)
            }
        })
    }

    //LogIn with GG
    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "448515807719-durgto8067gm495ag7bap7h6sbhu2vn8.apps.googleusercontent.com",
            callback: handleGoogleSignIn,
        })

        window.google.accounts.id.renderButton(
            document.getElementById("log-in__button--google-icon"),
            {size: "large", type: "icon"}
        )
    })

    const handleGoogleSignIn = (res) => {
        let gg = jwt_decode(res.credential)
        let t = checkExistedEmail(gg.email)
        t.then(res => {
            if (res == -1) {
                Axios.get('https://jfresgister-booth-api.herokuapp.com/business/maxid')
                .then(res => {
                    Axios.post("https://jfresgister-booth-api.herokuapp.com/account/register", {
                        "id": JSON.parse(res.data.result) + 1,
                        "name": gg.name,
                        "phone": "",
                        "email": gg.email,
                        "password": "!@#$%^",
                        "representation": gg.name,
                        "permit": 0
                    })
                })
            }
            Axios.post("https://jfresgister-booth-api.herokuapp.com/account/login", {
                email: gg.email,
                password: "!@#$%^"
            })
            .then(res => {
                saveToken(res.data)
                if (localStorage.getItem("admin") == "false") navigate(location.pathname + "user", { replace: true })
                else navigate(location.pathname + "admin", { replace: true })
                setOpenLog(false)
            })
        })
    }

    return (
        <div className='log'>
            <div className = "log_container">
                <div className = "reglog_header">
                    <p>Login</p>
                    <button onClick = {()=>setOpenLog(false)} className = "close">x</button>
                </div>
                <div className = "reglog_body">
                    <form onSubmit = {(e) => login(e)}>
                        <label htmlFor = "email" className = "reglog_label">
                            Email
                        </label>
                        <input onChange = {(e) => handle(e)} value = {data.email} type = "email" id = "email" className = "reglog_input" placeholder="Email" required name = "Email"></input>
                        <label htmlFor = "password" className = "reglog_label">
                            Password
                        </label>
                        <input onChange = {(e) => handle(e)} value = {data.password} type = "password" id = "password" className = "reglog_input" placeholder="Password" required name = "Password"></input>
                        <div id = "log-in--button">
                            <button id = "log-in__button--form" type = "submit">Login</button>
                            <div id = "log-in__button--google">
                                <div>Or log in with:</div>
                                <div id = "log-in__button--google-icon" />
                            </div>
                        </div>
                    </form>
                </div> 
            </div>
        </div>
    );
}

export default Log