import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(`===============req============`);
        console.log(req.headers);
        let cookies = req.headers.cookie;
        cookies = cookies.replace('refreshToken=', '');
        return cookies;
      },
      secretOrKey: 'myRefreshKey', // 복호화 과정 테스트용
    });
  }

  validate(payload) {
    console.log(`============payload============`);
    console.log(payload);

    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
