/* eslint-disable no-restricted-globals */
import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";

const LOGIN_SUCCES_PAGE = "/main";

const LOGIN_FAILURE_PAGE = "/";

export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: "domain",
        clientID: "clientID",
        redirectUri: `${window.location.href}callback`,
        audience: "audience",
        responseType: "token id_token",
        scope: "openid profile"
    })

    login = () => {
        this.auth0.authorize();
    }

    logout() {
        localStorage.removeItem("acces_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expiresAt");
        location.hash = "";
        location.pathname = LOGIN_FAILURE_PAGE;
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResults) => {
            if (authResults && authResults.accessToken && authResults.idToken) {
                let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
                localStorage.setItem("acces_token", authResults.accessToken);
                localStorage.setItem("id_token", authResults.idToken);
                localStorage.setItem("expiresAt", expiresAt);
                location.hash = "";
                location.pathname = LOGIN_SUCCES_PAGE;
            } else if (err) {
                location.pathname = LOGIN_FAILURE_PAGE;
                console.log(err);
            }
        });
    }

    isAuthenticated() {
        try {
            let expiresAt = JSON.parse(localStorage.getItem("expiresAt"));
            return new Date().getTime() < expiresAt;
        } catch (err) {
            return false;
        }
    }

    getProfile = () => {
        if (localStorage.getItem("id_token")) {
            return jwtDecode(localStorage.getItem("id_token"));
        } else {
            return {};
        }
    }
}