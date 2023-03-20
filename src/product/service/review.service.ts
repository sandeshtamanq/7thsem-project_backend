import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from 'src/auth/models/interface/user.interface';
import { Repository } from 'typeorm';
import { ReviewDto } from '../models/dto/review.dto';
import { ReviewEntity } from '../models/entity/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}
  postReview(reviewDto: ReviewDto, id: number, user: UserInterface) {
    const newReview = this.reviewRepository.create({
      review: reviewDto.review,
      productId: id,
      user: user,
    });

    return this.reviewRepository.save(newReview);
  }

  deleteReview(id: number) {
    return this.reviewRepository.delete(id);
  }
}
