import React from 'react'
import '../Homepage/Contact.css';
import {FaLocationArrow, FaPhoneSquareAlt, FaEnvelope} from "react-icons/fa";

function Contact() {
    return (
        <section id = "contact">
            <div className = "m_container">
                <div><p>CSE Job Fair Ho Chi Minh City University of Technology </p></div>
                <div>
                    <h1 style = {{textAlign : 'center'}}>Contact Us</h1>
                    <div className = "info">
                        <div><span><FaLocationArrow/></span><p>Ho Chi Minh City University of Technology. Di An, Binh Duong</p></div>
                        <div><span><FaEnvelope/></span><p>dtn-ktmt@hcmut.edu.vn</p></div>
                        <div><span><FaPhoneSquareAlt/></span><p>123-456-789</p></div>
                    </div>
                </div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125423.83265687623!2d106.59057865191272!3d10.773366423397862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a5568c997f%3A0xdeac05f17a166e0c!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIC0gxJBIUUcgVFAuSENN!5e0!3m2!1svi!2s!4v1653287751562!5m2!1svi!2s" width="600" height="450" frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex = "0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </section>
    );
}

export default Contact