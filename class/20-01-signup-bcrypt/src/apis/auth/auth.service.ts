import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}
  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id, password: user.password }, //
      { secret: 'myAccessKey', expiresIn: '1h' }, // 암호화할 키
    );
  }
}
