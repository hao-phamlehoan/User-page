import React from 'react';
import Hero from '../components/Hero'
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import '../assets/css/Home.css';

const Home = () => {
  return (
    <div className="Home">
      <Hero></Hero>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
}

export default Home;
