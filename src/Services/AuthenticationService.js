import axios from 'axios'
import {urlSignIn} from "../Constants/URLs";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
export const USER_NAME_SESSION_ATTRIBUTE_TOKEN = 'authenticatedUserToken';

class AuthenticationService {

    executeJwtAuthenticationService(usernameOrEmail, password) {
        return axios.post(urlSignIn, {
            usernameOrEmail,
            password
        })
    }

    registerSuccessfulLoginForJwt(username, tokenType, accesstoken) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN, this.createJWTToken(tokenType, accesstoken));
        this.setupAxiosInterceptors()
    }

    createJWTToken(tokenType, accesstoken) {
        console.log(tokenType + ' ' + accesstoken);
        return tokenType + ' ' + accesstoken
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        let token = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN);
        return (user !== null) && (token !== null);

    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return '';
        return user
    }

    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN)
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()