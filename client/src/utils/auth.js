import decode from 'jwt-decode';

class AuthService {
    // retrieve data saved in token 
    getProfile() {
        return decode(this.getToken());
    }

    // check if the user is still logged in 
    loggedIn() {
        //check if there is a saved token & its still valid
        const token = this.Token();
        // use typr coersion to check if token is NOT underfined and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    //check if the token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    //retireve from locatStorage
    getToken() {
        //Retrieve the user token from localStorage
        return localStorage.getItem('id_token');
    }

    //set token to localStroage and reload page to homepage
    login(idToken) {
        //saves user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // clear token from localStorage and force logout with reload
    logout() {
        //clear user token and profile and force logout with reload 
        localStorage.removeItem('if_token');
        //this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();