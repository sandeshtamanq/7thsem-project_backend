import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UserInterface } from 'src/auth/models/interface/user.interface';
import { SearchDto } from '../models/dto/search.dto';
import { SearchService } from '../service/search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  getSearchList(@GetUser() user: UserInterface) {
    return this.searchService.getSearchList(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addSearch(@GetUser() user: UserInterface, @Body() search: SearchDto) {
    return this.searchService.addSearch(user, search);
  }
}
