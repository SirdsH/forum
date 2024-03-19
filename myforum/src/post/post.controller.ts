import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { Posts } from './schema/post.model';
import { Like } from './schema/like.model';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Body() post: Posts): Promise<Posts> {
    return this.postService.createPost(post);
  }

  @Get()
  async getPosts(): Promise<Posts[]> {
    return this.postService.getPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<Posts> {
    return this.postService.getPostById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/comments')
  async createComment(
    @Param('id') postId: string,
    @Body() comment: Comment,
  ): Promise<Posts> {
    return this.postService.createComment(postId, comment);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/likes')
  async createLike(
    @Param('id') postId: string,
    @Body() like: Like,
  ): Promise<Posts> {
    return this.postService.createLike(postId, like);
  }
}
