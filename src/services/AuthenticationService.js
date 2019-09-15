import { BehaviorSubject } from 'rxjs';
import { handleResponse } from 'helpers/HandleResponse';

const currentSessionSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentSession')));

export const AuthenticationService = {
    login,
    logout,
    session: currentSessionSubject.asObservable(),
    get currentSessionValue () { return currentSessionSubject.value }
};

function login(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(session => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentSession', JSON.stringify(session));
            currentSessionSubject.next(session);

            return session;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentSession');
    currentSessionSubject.next(null);
}