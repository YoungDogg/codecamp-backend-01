import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtRefreshStrategy } from 'src/common/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/common/auth/jwt-social-google.strategy';
import { AuthController } from './auth.controller';
import { JwtNaverStrategy } from 'src/common/auth/jwt-social-naver.strategy';
import { JwtKakaoStrategy } from 'src/common/auth/jwt-social-kakao.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    JwtKakaoStrategy,
    JwtNaverStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    AuthResolver, //
    AuthService,
    UserService,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
