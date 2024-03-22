import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schema/comments.schema';
import { PostSchema } from '../post/schema/post.schema';
import { UserSchema } from '../users/schema/users.model';
import { PostService } from '../post/post.service';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Comment', schema: CommentSchema },
      { name: 'Posts', schema: PostSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService, PostService],
  exports: [CommentService],
})
export class CommentsModule {}
