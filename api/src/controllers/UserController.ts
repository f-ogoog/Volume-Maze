import { Body, Controller, Get, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { JwtAuthGuard } from '../utils/guards/JwtAuthGuard';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { UserMapper } from '../mappers/UserMapper';
import { BookMapper } from '../mappers/BookMapper';

@Controller('/users')
export class UserController {
  constructor (
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
    private readonly bookMapper: BookMapper,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update (
    @Req() req,
    @Body() body: UpdateUserDto,
  ) {
    const user = await this.userService.update(req.user.id, body);
    return this.userMapper.getUser(user);
  }
}