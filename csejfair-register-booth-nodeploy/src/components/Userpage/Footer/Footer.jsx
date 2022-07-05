import React from 'react'
import '../Footer/Footer.css';
import {FaFacebook, FaPhoneSquareAlt, FaEnvelope} from "react-icons/fa";

import bk_logo from '../../../assets/User_img/HCMUT.png'

function Footer() {
    return (
        <footer id = "footer1">
            <div className = "m_container">
                <p><img src = {bk_logo} style = {{width: 16}}></img>Ho Chi Minh University of Technology (HCMUT) - VNU HCM</p>
                <span>
                    <a className='footer-icon' href="https://www.facebook.com/BKCSE.Multimedia" target="_blank"><FaFacebook/></a>
                    <a className='footer-icon' href="mailto:dtn-ktmt@hcmut.edu.vn"><FaEnvelope/></a>
                    <a><FaPhoneSquareAlt/></a>
                </span>
            </div>
        </footer>
    );
}

export default Footer;