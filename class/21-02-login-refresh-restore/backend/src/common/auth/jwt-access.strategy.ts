import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: (qqq) => { console.log(qqq);},
      secretOrKey: 'myAccessKey', // 복호화 과정 테스트용
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
