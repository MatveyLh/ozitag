import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./utils/PrivateRoute";
import './App.css';

const App = () => {
    return (
        <Router>
            <Route path={'/login'} component={(props: any) => <Login {...props}/>}/>
            <PrivateRoute component={() => <Profile/>} path={'/profile'}/>
        </Router>
    )
}

export default App;
