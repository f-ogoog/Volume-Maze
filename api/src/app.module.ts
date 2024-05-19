import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/PrismaModule';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/AuthModule';
import { MapperModule } from './modules/MapperModule';
import { BookModule } from './modules/BookModule';
import { UserModule } from './modules/UserModule';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MapperModule,
    BookModule,
    UserModule,
  ],
})
export class AppModule {}
