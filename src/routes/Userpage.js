import './Userpage.css';
import React, { useState } from 'react';
import { Header } from '../components/Userpage/Header/Header';
import Body from '../components/Userpage/Body/Body';
import Footer from '../components/Userpage/Footer/Footer';

const Userpage = () => {
    return (
        <div className="Home">
            <Header></Header>
            <Body></Body>
            <Footer></Footer>
        </div>
    );
}

export default Userpage;