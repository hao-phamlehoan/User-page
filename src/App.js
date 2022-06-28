import './App.css';
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./routes/Homepage";
import Userpage from "./routes/Userpage";
import Adminpage from "./routes/Adminpage";
import Header from './components/Homepage/Header';
import NotFound from './components/NotFound';
import './routes/Home.css';
import { Switch } from 'react-router-dom';
function App() {
    return (
        <div>
            <HashRouter>
                <Header Login={false}></Header>
                <Switch>
                    <Route exact path="User-page/" component={<Home />} />
                    <Route exact path="User-page/user" component={<Userpage />} />
                    <Route exact path="User-page/admin" component={<Adminpage />} />
                    <Route exact path="*" component={<NotFound />} />
                </Switch>
            </HashRouter>
        </div>
    )
}

export default App;