import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import {use} from "passport";

@Injectable()
export class UserService {
  constructor (
    private readonly userRepository: UserRepository,
  ) {}

  update (userId: string, body: UpdateUserDto) {
    return this.userRepository.updateById(userId, body);
  }
}