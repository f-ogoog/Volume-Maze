import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { UpdateUserDto } from '../dtos/UpdateUserDto';

@Injectable()
export class UserService {
  constructor (
    private readonly userRepository: UserRepository,
  ) {}

  update (userId: string, body: UpdateUserDto) {
    return this.userRepository.updateById(userId, body);
  }
}