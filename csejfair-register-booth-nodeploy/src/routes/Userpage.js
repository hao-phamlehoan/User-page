
import React, { useState } from 'react';
import Body from '../components/Userpage/Body/Body';
import Footer from '../components/Userpage/Footer/Footer';
import './common.css';

const Userpage = () => {
    return (
        <div className="Home">
            <Body></Body>
            <Footer></Footer>
        </div>
    );
}

export default Userpage;