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
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let PostService = class PostService {
    constructor(postModel, userModel) {
        this.postModel = postModel;
        this.userModel = userModel;
    }
    async createPost(createPostDto, user) {
        const createdPost = new this.postModel({
            ...createPostDto,
            author: user,
        });
        return createdPost.save();
    }
    async getPost(id) {
        return this.postModel.findById(id).populate('author').exec();
    }
    async getAllPosts() {
        return this.postModel.find().populate('author').exec();
    }
    async deletePost(id) {
        return this.postModel.findByIdAndDelete(id).exec();
    }
    async updatePost(id, updatePostDto) {
        return this.postModel
            .findByIdAndUpdate(id, updatePostDto, { new: true })
            .exec();
    }
    async getPostsByUser(userId) {
        return this.postModel.find({ author: userId }).populate('author').exec();
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Posts')),
    __param(1, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], PostService);
//# sourceMappingURL=post.service.js.map