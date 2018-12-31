import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './resources/css/app.css'
import { BrowserRouter } from 'react-router-dom';

import { firebase } from './firebase';


const App = (props) => {
    return (
        <BrowserRouter>
            <Routes {...props}/>
        </BrowserRouter>
    )
}
/*
When firebase auth state changes return the App
*/
firebase.auth().onAuthStateChanged((user) => {
    ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})





