import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/AuthService';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { LocalAuthGuard } from '../utils/guards/LocalAuthGuard';
import { JwtAuthGuard } from '../utils/guards/JwtAuthGuard';
import { UpdatePasswordDto } from '../dtos/UpdatePasswordDto';

@Controller('/auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login (
    @Req() req,
  ) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  register (
    @Body() body: CreateUserDTO,
  ) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getMe (
    @Req() req,
  ) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/password')
  changePassword (
    @Req() req,
    @Body() body: UpdatePasswordDto,
  ) {
    return this.authService.changePassword(req.user.id, body);
  }
}