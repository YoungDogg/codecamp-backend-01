import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccesskey', expiresIn: '1h' },
    );
    return accessToken;
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshkey', expiresIn: '2w' },
    );
    console.log(`refreshToken================`);
    console.log(refreshToken);
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
    // 배포환경
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=mybacksite.com; SameSite=None; Secure; httpOnly;`
    // )
  }
}
