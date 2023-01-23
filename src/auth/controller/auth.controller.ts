import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { GetUser } from '../decorator/get-user.decorator';
import { hasRoles } from '../decorator/roles.decorator';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/roles.guard';
import { LoginDto } from '../models/dto/login.dto';
import { SignUpDto } from '../models/dto/signup.dto';
import { UserInterface } from '../models/interface/user.interface';
import { UserRoles } from '../models/interface/user.roles';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get()
  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  test(@GetUser() user: UserInterface) {
    return 'hello';
  }
}
