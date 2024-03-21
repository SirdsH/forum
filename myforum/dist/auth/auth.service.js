"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(user) {
        const newUser = await this.usersService.createUser(user);
        const payload = { username: newUser.username, sub: newUser._id };
        const access_token = this.jwtService.sign(payload);
        return { ...newUser, access_token };
    }
    async validateUser(username, password) {
        const user = await this.usersService.getUser({ username });
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            return user;
        }
        return null;
    }
    async login(user) {
        try {
            const dbUser = await this.validateUser(user.username, user.password);
            if (!dbUser) {
                throw new Error('Invalid credentials');
            }
            const payload = { username: user.username, sub: dbUser._id };
            console.log('payload', payload);
            const access_token = this.jwtService.sign(payload);
            return { ...dbUser, access_token };
        }
        catch (error) {
            console.error(error);
            throw new Error('An error occurred while logging in. Please try again later.');
        }
    }
    async logout() {
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.removeItem('access_token');
        }
        window.location.href = '/login';
    }
    isLoggedIn() {
        if (typeof sessionStorage !== 'undefined') {
            const access_token = sessionStorage.getItem('access_token');
            if (access_token) {
                return true;
            }
        }
        return false;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map