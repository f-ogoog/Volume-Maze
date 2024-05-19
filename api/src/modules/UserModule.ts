import { Module } from '@nestjs/common';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { PrismaModule } from './PrismaModule';
import { MapperModule } from './MapperModule';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, MapperModule],
})
export class UserModule {}