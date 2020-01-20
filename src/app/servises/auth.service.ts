export class AuthService {
    
    private isAuth = false;

    login() {
        this.isAuth = true;
    }

    isLoggedIn(): boolean {
        return this.isAuth;
    }
}