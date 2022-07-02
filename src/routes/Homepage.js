import React from 'react';
import Hero from '../components/Homepage/Hero'
import Contact from '../components/Homepage/Contact';
import Footer from '../components/Homepage/Footer';
import Organization from '../components/Homepage/Organization';
import Booth from '../components/Homepage/booth';
import './Home.css';

const Home = () => {
  return (
    <div className="Home">
      <Hero></Hero>
      <Booth></Booth>
      <Organization></Organization>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );  
}

export default Home;