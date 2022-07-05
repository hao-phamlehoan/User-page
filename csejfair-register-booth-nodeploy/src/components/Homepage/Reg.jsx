import React, {useState} from 'react'
import Axios from 'axios'
import './RegLog.css'

const checkExistedEmail = (email) => {
    return (
        Axios.get('https://jfresgister-booth-api.herokuapp.com/business/all')
        .then(res => {
            return res.data.result.map((user) => {return user.email}).indexOf(email)
        })
    )
}

const Reg = ({setOpenReg}) => {
    const url = "https://jfresgister-booth-api.herokuapp.com/account/register"
    const [info, setInfo] = useState({
        id: 0,
        name: "",
        phone: "",
        email: "",
        representation: "",
        password: "",
        conf_password: ""
    })

    function submitRegisterForm(e) {
        e.preventDefault()
        if (!(info.password === info.conf_password)) alert("The passwords you entered did not match\nPlease try again!")
        else { 
            let t = checkExistedEmail(info.email)
            t.then(res => {
                if (res != -1) {
                    alert("This email address is already registered\nChoose a different address")
                }
                else {
                    Axios.get('https://jfresgister-booth-api.herokuapp.com/business/maxid')
                    .then(res => 
                        {info.id = JSON.parse(res.data.result) + 1
                        Axios.post(url, {
                            "id": info.id,
                            "name": info.name,
                            "phone": info.phone,
                            "email": info.email,
                            "password": info.password,
                            "representation": info.representation,
                            "permit": 0
                        })
                        .then(res => {
                            alert("Register successfully!!!")
                            setOpenReg(false)
                        })
                    }) 
                }
            })
        }
    }

    function handleRegister(e) {
        const newdata = {...info}
        newdata[e.target.id] = e.target.value
        setInfo(newdata)
    }

    return (
        <div className = "reg">
            <div className = "reg_container">
                <div className = "reglog_header">
                    <p>Register</p>
                    <button onClick = {()=>setOpenReg(false)} className = "close">x</button>
                </div>
                <form className = "reglog_body" onSubmit = {(e) => submitRegisterForm(e)}>
                    <label htmlFor = "name" className = "reglog_label">
                        Organization Name
                    </label>
                    <input onChange = {(e) => handleRegister(e)} id = "name" value = {info.name} type = "txt" className="reglog_input" placeholder = "Name" required name = "Name"></input>
                    <label htmlFor = "representation" className="reglog_label">
                        Organisational Representative
                    </label>
                    <input onChange = {(e) => handleRegister(e)} id ="representation" type = "txt" value = {info.representation} className="reglog_input" placeholder="Name of representative" required name = "Name of representative"></input>
                    <label htmlFor = "phone" className="reglog_label">
                        Phone Number
                    </label>
                    <input onChange = {(e) => handleRegister(e)} id = "phone" type = "tel" value = {info.phone} className = "reglog_input" placeholder = "123-45-678" required name = "123-45-678"></input>
                    <label htmlFor = "email" className="reglog_label">
                        Email
                    </label>
                    <input onChange = {(e) => handleRegister(e)} id = "email" type = "email" value = {info.email} className = "reglog_input" placeholder = "abc@gmail.com" required name = "abc@gmail.com"></input>
                    <label htmlFor = "password" className = "reglog_label">
                        Password
                    </label>
                    <input onChange = {(e) => handleRegister(e)} id = "password" type = "password" value = {info.password} className = "reglog_input" placeholder = "Password" required name = "Password"></input>
                    <label htmlFor = "conf_password" className = "reglog_label"> Confirm password </label>
                    <input onChange = {(e) => handleRegister(e)} id = "conf_password" type = "password" value = {info.conf_password} className = "reglog_input" placeholder = "Confirm password" required name = "Confirm password"></input>
                
                    
                    <button>Register</button>
                </form> 
            </div>
        </div>
    );
}

export default Reg