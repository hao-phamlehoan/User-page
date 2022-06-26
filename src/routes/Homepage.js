import React, {useState} from 'react';
import Header from '../components/Homepage/Header';
import Hero from '../components/Homepage/Hero'
import Contact from '../components/Homepage/Contact';
import Footer from '../components/Homepage/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="Home">
      <Header></Header>
      <Hero></Hero>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
}

export default Home;