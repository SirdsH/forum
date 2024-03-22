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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const comments_service_1 = require("./comments.service");
const post_service_1 = require("../post/post.service");
let CommentController = class CommentController {
    constructor(commentService, postService) {
        this.commentService = commentService;
        this.postService = postService;
    }
    async createComment(postId, createCommentDto) {
        const post = await this.findPostById(postId);
        return this.commentService.createComment(post, createCommentDto);
    }
    async findPostById(id) {
        const post = await this.postService.getPost(id);
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    }
    async deleteComment(postId, commentId) {
        try {
            await this.commentService.deleteComment(postId, commentId);
        }
        catch (error) {
            console.error(error + 'Failed to delete the comment. Please try again.');
        }
    }
    async getCommentsByPostIdHandler(postId) {
        return await this.commentService.getCommentsByPostId(postId);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, common_1.Delete)(':commentId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getCommentsByPostIdHandler", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('posts/:postId/comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentService,
        post_service_1.PostService])
], CommentController);
//# sourceMappingURL=comments.controller.js.map