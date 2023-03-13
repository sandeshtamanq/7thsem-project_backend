import { Injectable } from '@nestjs/common';
import { ReviewDto } from '../models/dto/review.dto';

@Injectable()
export class ReviewService {
  postReview(reviewDto: ReviewDto) {}
}
