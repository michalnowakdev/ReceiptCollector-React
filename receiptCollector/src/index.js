import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import * as serviceWorker from './serviceWorker';
import Auth from './Auth';
import { onSetBrowserLang } from './utils';

const auth = new Auth();
onSetBrowserLang();

let state = {};
window.setState = (changes) => {
    state = Object.assign({}, state, changes);
    ReactDOM.render(<Router {...state} />, document.getElementById('root'));
}

const userData = auth.getProfile();
const userName = userData.nickname || "User";
const userEmail = userData.name || "test@mail.com";

let initialstate = {
    userEmail: userEmail,
    userName: userName,
    auth
}
window.setState(initialstate);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
