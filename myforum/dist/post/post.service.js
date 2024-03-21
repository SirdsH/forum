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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let PostService = class PostService {
    constructor(postModel, jwtService, usersService) {
        this.postModel = postModel;
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async createPost(createPostDto, token) {
        try {
            const decoded = await this.jwtService.verifyAsync(token);
            if (!decoded) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            const user = await this.usersService.getUser({ _id: decoded.sub });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const newPost = new this.postModel({
                ...createPostDto,
                author: user._id,
            });
            return newPost.save();
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async getPosts() {
        return await this.postModel.find().exec();
    }
    async findOne(id) {
        return this.postModel.findOne({ _id: new mongoose_3.Types.ObjectId(id) }).exec();
    }
    async remove(id) {
        if (!id) {
            throw new common_1.BadRequestException('Invalid id');
        }
        const postId = new mongoose_3.Types.ObjectId(id);
        return this.postModel.findOneAndDelete({ _id: postId }).exec();
    }
    async updatePost(post) {
        if (!post._id) {
            throw new common_1.BadRequestException('Invalid id');
        }
        const postId = new mongoose_3.Types.ObjectId(post._id);
        return this.postModel
            .findOneAndUpdate({ _id: postId }, post, { new: true })
            .exec();
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Posts')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        users_service_1.UsersService])
], PostService);
//# sourceMappingURL=post.service.js.map