import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { JwtAuthGuard } from '../utils/guards/JwtAuthGuard';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { UserMapper } from '../mappers/UserMapper';

@Controller('/users')
export class UserController {
  constructor (
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
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