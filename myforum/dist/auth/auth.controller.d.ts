import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<any>;
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
