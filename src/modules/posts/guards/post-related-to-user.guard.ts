import { CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'modules/auth/entities/user.entity';
import { JwtPayload } from 'types';

export class PostRelatedToUserGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const currentUser = request.user as JwtPayload;
    const postId = +request.params.id;

    const user = await this.usersRepository.findOne({
      where: { id: currentUser.id },
      relations: { posts: true },
    });

    const postInUser = user.posts.find((post) => post.id === postId);
    return !!postInUser;
  }
}
