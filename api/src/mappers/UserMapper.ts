import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserMapper {
  getUser (user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    }
  }
}