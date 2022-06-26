import React, {useState} from 'react'
import Axios from 'axios'
import '../Homepage/RegLog.css'

const Reg = ({setOpenReg}) => {
    const url = "https://jfresgister-booth-api.herokuapp.com/account/register"
    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        representation: "",
        password: "",
        conf_password: ""
    })
    function submit(e) {
        if (!(data.password === data.conf_password)) {
            e.preventDefault()
            alert("The passwords you entered did not match\nPlease try again!")
        } else { 
            Axios.get('https://jfresgister-booth-api.herokuapp.com/business/maxid')
            .then(res => {
                data.id = JSON.parse(res.data.result) + 1
            })
            Axios.post(url, {
                id: data.id,
                name: data.name,
                phone: data.phone,
                email: data.email,
                representation: data.representation,
                password: data.password
            })
            .then(res => {
                alert("Register successfully!!!")
            })
        }
    }

    function handle(e) {
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    return (
        <div className = "reg">
            <div className = "reg_container">
                <div className = "reglog_header">
                    <p>Register</p>
                    <button onClick = {()=>setOpenReg(false)} className = "close">x</button>
                </div>
                <form className = "reglog_body" onSubmit = {(e) =>submit(e)}>
                    <label for = "name" className = "reglog_label">
                        Organization Name
                    </label>
                    <input onChange = {(e) => handle(e)} id = "name" value = {data.name} type = "text" className="reglog_input" placeholder = "Name" required name = "Name"></input>
                    <label for = "representation" className="reglog_label">
                        Organisational Representative
                    </label>
                    <input onChange = {(e) => handle(e)} id ="representation" type = "text" value = {data.representation} className="reglog_input" placeholder="Name of representative" required name = "Name of representative"></input>
                    <label for = "phone" className="reglog_label">
                        Phone Number
                    </label>
                    <input onChange = {(e) => handle(e)} id = "phone" type = "tel" value = {data.phone} className = "reglog_input" placeholder = "123-45-678" required name = "123-45-678"></input>
                    <label for = "email" className="reglog_label">
                        Email
                    </label>
                    <input onChange = {(e) => handle(e)} id = "email" type = "email" value = {data.email} className = "reglog_input" placeholder = "abc@gmail.com" required name = "abc@gmail.com"></input>
                    <label for = "password" className = "reglog_label">
                        Password
                    </label>
                    <input onChange = {(e) => handle(e)} id = "password" type = "password" value = {data.password} className = "reglog_input" placeholder = "Password" required name = "Password"></input>
                    <label for = "conf_password" className = "reglog_label"> Confirm password </label>
                    <input onChange = {(e) => handle(e)} id = "conf_password" type = "password" value = {data.conf_password} className = "reglog_input" placeholder = "Confirm password" required name = "Confirm password"></input>
                    <button>Register</button>
                </form> 
            </div>
        </div>
    );
}

export default Reg