import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index() {
    return {
      Title: '7th Semester Project',
      Description:
        'This api is created by Sandesh Tamang for the 7th semester project',
      Teams: ['Sandesh Tamang', 'Roshan Thapa', 'Sudip Gurung'],
    };
  }
}
