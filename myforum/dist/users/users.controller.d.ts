import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("src/users/schema/users.model").User>;
    getUser(query: object): Promise<import("src/users/schema/users.model").User>;
}
