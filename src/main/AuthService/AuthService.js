import decode from 'jwt-decode';
export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://localhost:8080' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(username, password) {
        // Get a token from api server using the fetch api
        return fetch(`https://bookticket-195813.appspot.com/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${username}&password=${password}`
        })
            .then(res => res.json())
            .then(json => {
                console.log('parsed json', json)
                // eslint-disable-next-line
                if (json.message === "Authentication failed. User not found.") { throw 501; }
                 // eslint-disable-next-line
                else if (json.message === "Authentication failed. Wrong password.") { throw 502; };
                 // eslint-disable-next-line
                this.setToken(json.token, json.email, json.name) // Setting the token in localStorage
                return Promise.resolve(json); // access json.body here
            })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken, email, name) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        localStorage.setItem('email', email);
        localStorage.setItem('name', name);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}