import { IsNotEmpty, Max, Min } from 'class-validator';

export class SearchDto {
  @IsNotEmpty()
  @Max(20)
  @Min(1)
  search: string;
}
