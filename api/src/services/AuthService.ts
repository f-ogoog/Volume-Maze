import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UserRepository } from '../repositories/UserRepository';
import * as bcrypt from 'bcrypt';
import { AlreadyRegisteredException } from '../utils/exceptions/AlreadyRegisteredException';
import { JwtService } from '@nestjs/jwt';
import { UserMapper } from '../mappers/UserMapper';
import { UpdatePasswordDto } from '../dtos/UpdatePasswordDto';

@Injectable()
export class AuthService {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly userMapper: UserMapper,
  ) {}

  async register (body: CreateUserDTO) {
    const { password, ...securedUser } = body;

    const user = await this.userRepository.find({
      OR: [
        { username: securedUser.username },
        { email: securedUser.email },
      ],
    });
    if (user) throw new AlreadyRegisteredException();

    const hashedPassword = await this.hashPassword(password);

    await this.userRepository.create({
      ...securedUser,
      password: hashedPassword,
    });
  }

  private async hashPassword (password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async validateUser (username: string, password: string) {
    const user  = await this.userRepository.find({
      OR: [
        { username },
        { email: username },
      ],
    });
    if (!user) throw new UnauthorizedException('Username is wrong');

    const comparedPasswords = await bcrypt.compare(password, user.password);

    if (!comparedPasswords) throw new UnauthorizedException('Password is wrong');

    return this.userMapper.getUser(user);
  }

  async login (user) {
    return this.getAccessToken(user.id);
  }

  private getAccessToken (userId) {
    const payload = { sub: userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async changePassword (userId, { oldPassword, newPassword }: UpdatePasswordDto ) {
    if (oldPassword === newPassword) throw new BadRequestException('New password must be different from the old one');

    const user = await this.userRepository.findById(userId);

    const comperedPasswords = await bcrypt.compare(oldPassword, user.password);
    if (!comperedPasswords) throw new BadRequestException('Password is wrong');

    const password = await this.hashPassword(newPassword);

    await this.userRepository.updateById(userId, {
      password,
    })
  }
}