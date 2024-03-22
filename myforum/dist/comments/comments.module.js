"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comments_schema_1 = require("./schema/comments.schema");
const post_schema_1 = require("../post/schema/post.schema");
const users_model_1 = require("../users/schema/users.model");
const post_service_1 = require("../post/post.service");
const comments_controller_1 = require("./comments.controller");
const comments_service_1 = require("./comments.service");
let CommentsModule = class CommentsModule {
};
exports.CommentsModule = CommentsModule;
exports.CommentsModule = CommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Comment', schema: comments_schema_1.CommentSchema },
                { name: 'Posts', schema: post_schema_1.PostSchema },
                { name: 'User', schema: users_model_1.UserSchema },
            ]),
        ],
        controllers: [comments_controller_1.CommentController],
        providers: [comments_service_1.CommentService, post_service_1.PostService],
        exports: [comments_service_1.CommentService],
    })
], CommentsModule);
//# sourceMappingURL=comments.module.js.map