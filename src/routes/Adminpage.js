import './Userpage.css';
import React from 'react';
import Body from '../components/Adminpage/Body/Body';
import Footer from '../components/Userpage/Footer/Footer';
import './Home.css';

const Adminpage = () => {
    return (
        <div className='Home'>
            <Body></Body>
            <Footer></Footer>
        </div>
    );
}

export default Adminpage;