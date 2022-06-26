import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Homepage";
import Userpage from "./routes/Userpage";
import { useState, useEffect } from 'react';
import Header from './components/Homepage/Header';
import './routes/Home.css';
function App() {
    return (
        <Router>
            <Header Login={false}></Header>
            <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "/user" element = {<Userpage />} />
            </Routes>
        </Router>
    )
}

export default App;