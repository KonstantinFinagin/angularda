import { User } from '../users/user';

export class LoginResponse {
    message: string;
    token: string;
    user: User;
}