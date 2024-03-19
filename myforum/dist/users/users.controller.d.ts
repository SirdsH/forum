import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(query: object): Promise<import("src/users/schema/users.model").User>;
}
