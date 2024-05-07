export interface User {
    userId?: number;
    username: string;
    password: string;
    firstname?: string;
    lastname?: string;
    telephone?: string;
    address?: string;
    cin?: string;
    job?: string;
    loginAttempts?: number;
}
