import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Homepage";
import Userpage from "./routes/Userpage";
import { useState, useEffect } from 'react';
import callApi from './api/callApi';

function App() {

    // const [productList, setProductList] = useState({});
    // useEffect(() => {
    //     const fetchProductList = async () => {
    //         try {
    //             const response = await callApi.getAll();
    //             console.log('Fetch products successfully: ', response);
    //         } catch (error) {
    //             console.log('Failed to fetch product list: ', error);
    //         }
    //     }
    //     fetchProductList();
    // }, []);
    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "/user" element = {<Userpage />} />
            </Routes>
        </Router>
    )
}

export default App;