import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointTransaction } from '../pointTransaction/entities/pointTransaction.entity';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, PointTransaction])],
  providers: [
    UserResolver, //
    UserService,
  ],
})
export class UserModule {}
