import './Userpage.css';
import React, { useState } from 'react';
import Header from '../components/Homepage/Header';
import Body from '../components/Userpage/Body/Body';
import Footer from '../components/Userpage/Footer/Footer';
import './Home.css';

const Userpage = () => {
    return (
        <div className="Home">
            <Body></Body>
            <Footer></Footer>
        </div>
    );
}

export default Userpage;