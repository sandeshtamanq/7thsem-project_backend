import { CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from '../models/entity/review.entity';

export class VerifyUserGuard implements CanActivate {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const review = await this.reviewRepository.findOne({
      where: { id: parseInt(params.id) },
      relations: ['user'],
    });
    return user.id === review.user.id;
  }
}
