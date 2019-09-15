import { AuthenticationService } from "services/AuthenticationService";

export function authHeader() {
    // return authorization header with jwt token
    const currentSession = AuthenticationService.currentSessionValue;
    if (currentSession && currentSession.token) {
        return { Authorization: `Bearer ${currentSession.token}` };
    } else {
        return {};
    }
}