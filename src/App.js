import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Homepage";
import Userpage from "./routes/Userpage";
import { useState, useEffect } from 'react';
import Header from './components/Homepage/Header';
import './routes/Home.css';
import Table from '../src/components/Adminpage/SortTable'
function App() {
    return (
        <Router>
            <Header Login={false}></Header>
            <Routes>
                <Route path = "User-page/" element = {<Home />} />
                <Route path = "User-page/user" element = {<Userpage />} />
            </Routes>
        </Router>
        // <Table></Table>
    )
}

export default App;