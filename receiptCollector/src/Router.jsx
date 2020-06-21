import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Menu from './components/NavBar';

import Landing from './pages/Landing';
import Main from './pages/Main';
import Callback from './pages/Callback';

const Router = ({ userEmail, userName, auth }) => {
    const { login } = auth;
    const isAuthenticated = auth.isAuthenticated();
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Menu auth={auth} />
            <main>
                <Switch>
                    <Route exact path={"/"} component={() => <Landing login={login} />} />
                    {isAuthenticated && <Route exact path={"/main"} component={() =>
                        <Main
                            userEmail={userEmail}
                            userName={userName}
                        />} />
                    }
                    <Route exact path={"/callback"} component={Callback} />
                    <Route path={"/"} component={() => <Landing />} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default Router;
