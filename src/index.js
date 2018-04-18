import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './main/App/App';
import Login from "./main/Login/Login";


ReactDOM.render(
    <div>
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
        </div>
    </Router>
    </div>,
    document.getElementById('app')
);
