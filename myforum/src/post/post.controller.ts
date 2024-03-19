import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { Posts } from './schema/post.model';
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

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
}
