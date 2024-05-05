import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/PrismaModule';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/AuthModule';
import { MapperModule } from './modules/MapperModule';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MapperModule,
  ],
})
export class AppModule {}
