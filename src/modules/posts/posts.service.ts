import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto, UpdatePostDto } from './dto';

import { Post } from './entities/post.entity';
import { User } from '../auth/entities/user.entity';
import { JwtPayload } from 'types';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createPostDto: CreatePostDto, currentUser: JwtPayload) {
    const author = await this.usersRepository.findOneBy({ id: currentUser.id });
    const post = this.postsRepository.create({ ...createPostDto, author });

    return await this.postsRepository.save(post);
  }

  async findAll() {
    return await this.postsRepository.find();
  }

  async findOne(id: number) {
    return await this.findPostByIdOrFail(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findPostByIdOrFail(id);
    const updatedPost = { ...post, ...updatePostDto };
    return await this.postsRepository.save(updatedPost);
  }

  async remove(id: number) {
    const post = await this.findPostByIdOrFail(id);
    return await this.postsRepository.remove(post);
  }

  private async findPostByIdOrFail(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
        author: true,
      },
    });
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    return post;
  }
}
