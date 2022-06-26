import React, {useState} from 'react'
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import {  useLocation } from 'react-router-dom';
import '../Homepage/RegLog.css'

const Log = ({setOpenLog}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const url = "https://jfresgister-booth-api.herokuapp.com/account/login"
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    function handle(e) {
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    function saveToken(tokenDetails) {
        localStorage.setItem('user', JSON.stringify(tokenDetails.user))
        localStorage.setItem('admin', JSON.stringify(tokenDetails.isAdmin))
        localStorage.setItem('isLogined', 'true')
    }

    function login(e) {
        e.preventDefault()
        Axios.post(url, {
            email: data.email,
            password: data.password
        })
        .then(res => {
            if (!res.data.status) {
                e.preventDefault()
                alert("Wrong Email or Password!!!\nPlease try again")
            }
            else {
                saveToken(res.data)
                if (localStorage.getItem("admin") == "false") navigate(location.pathname + "//user", { replace: true })
                else navigate(location.pathname + "admin", { replace: true })
                setOpenLog(false)
            }
        })
        
    }
    return (
        <div className='log'>
            <div className = "log_container">
                <div className = "reglog_header">
                    <p>Login</p>
                    <button onClick = {()=>setOpenLog(false)} className = "close">x</button>
                </div>
                <form className = "reglog_body" onSubmit = {(e) => login(e)}>
                    <label for = "email" className = "reglog_label">
                        Email
                    </label>
                    <input onChange = {(e) => handle(e)} value = {data.email} type = "email" id = "email" className = "reglog_input" placeholder="Email" required name = "Email"></input>
                    <label for = "password" className = "reglog_label">
                        Password
                    </label>
                    <input onChange = {(e) => handle(e)} value = {data.password} type = "password" id = "password" className = "reglog_input" placeholder="Password" required name = "Password"></input>
                    <button type = "submit">Login</button>
                </form> 
            </div>
        </div>
    );
}

export default Log