import { Module } from '@nestjs/common';
import { UserMapper } from '../mappers/UserMapper';
import {BookMapper} from "../mappers/BookMapper";

@Module({
  providers: [UserMapper, BookMapper],
  exports: [UserMapper, BookMapper],
})
export class MapperModule {}