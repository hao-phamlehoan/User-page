import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Homepage";
import Userpage from "./routes/Userpage";
import Adminpage from "./routes/Adminpage";
import Header from './components/Homepage/Header';
import NotFound from './components/NotFound';
import './routes/common.css';
function App() {
    return (
        <Router>
            <Header Login={false}></Header>
            <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "/User-page" element = {<Home />} />
                <Route path = "/User-page/user" element = {<Userpage />} />
                <Route path = "/User-page/admin" element = {<Adminpage />} />
                <Route path = "*" element = {<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App;