
import { AuthenticationService } from 'services/AuthenticationService';

const request = (url, data = {}, method = "GET") => {
  let options = {
    method: method,
    headers: authHeader(),
  }
  if (method != "GET") options.body = JSON.stringify(data)
  return fetch(url, options)
  .then(handleResponse)
}

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                AuthenticationService.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

// return authorization header with jwt token
const authHeader = () => {
    const currentSession = AuthenticationService.currentSessionValue;
    if (currentSession && currentSession.token) {
        return { 
          'content-type': 'application/json',
          'Authorization': `Bearer ${currentSession.token}` 
        };
    } else {
        return {};
    }
}

export const ApiRequest = {
  request,
  handleResponse
};