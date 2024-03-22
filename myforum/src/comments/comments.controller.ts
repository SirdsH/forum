import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDocument } from './schema/comments.schema';
import { CommentService } from './comments.service';
import { PostDocument } from '../post/schema/post.schema';
import { PostService } from '../post/post.service';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private postService: PostService,
  ) {}

  @Post('create')
  async createComment(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentDocument> {
    const post = await this.findPostById(postId);
    return this.commentService.createComment(post, createCommentDto);
  }

  private async findPostById(id: string): Promise<PostDocument> {
    const post = await this.postService.getPost(id);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  @Delete(':commentId')
  async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ): Promise<void> {
    try {
      await this.commentService.deleteComment(postId, commentId);
    } catch (error) {
      console.error(error + 'Failed to delete the comment. Please try again.');
    }
  }
  @Get()
  async getCommentsByPostIdHandler(
    @Param('postId') postId: string,
  ): Promise<CommentDocument[]> {
    return await this.commentService.getCommentsByPostId(postId);
  }
}
