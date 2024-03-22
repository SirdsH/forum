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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CommentService = class CommentService {
    constructor(commentModel, postModel, userModel) {
        this.commentModel = commentModel;
        this.postModel = postModel;
        this.userModel = userModel;
    }
    async createComment(post, createCommentDto) {
        const author = await this.userModel.findById(createCommentDto.author);
        if (!author) {
            throw new Error('User not found');
        }
        const newComment = new this.commentModel({
            ...createCommentDto,
            author,
        });
        post.comments.push(newComment);
        await newComment.save();
        await post.save();
        return newComment;
    }
    async getCommentsByPostId(postId) {
        const foundPost = await this.postModel.findById(postId, 'comments');
        if (!foundPost) {
            throw new common_1.NotFoundException('Post not found');
        }
        const comments = await this.commentModel
            .find({ _id: { $in: foundPost.comments } })
            .populate('author')
            .exec();
        if (!comments || comments.length === 0) {
            throw new common_1.NotFoundException('No comments found for the post');
        }
        return comments;
    }
    async deleteComment(postId, commentId) {
        const post = await this.postModel.findById(postId).populate('comments');
        if (!post) {
            throw new Error('Comment or post not found');
        }
        post.comments = post.comments.filter((comment) => comment._id.toString() !== commentId);
        await post.save();
        return this.commentModel.findById(commentId);
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Comment')),
    __param(1, (0, mongoose_2.InjectModel)('Posts')),
    __param(2, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], CommentService);
//# sourceMappingURL=comments.service.js.map