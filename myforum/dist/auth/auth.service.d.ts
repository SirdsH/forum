import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schema/users.model';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<User>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
