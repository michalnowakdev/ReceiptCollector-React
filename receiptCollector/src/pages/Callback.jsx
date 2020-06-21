import React, { Component } from 'react';
import Auth from '../Auth';
import Loader from '../components/Loader';

export default class Secret extends Component {

    componentDidMount() {
        const auth = new Auth();
        auth.handleAuthentication();
    }
    render() {
        return (
            <Loader />
        )
    }
}