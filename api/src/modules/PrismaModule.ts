import { Module } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';
import { UserRepository } from '../repositories/UserRepository';

@Module({
  providers: [
    PrismaService,
    UserRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
  ],
})
export class PrismaModule {}