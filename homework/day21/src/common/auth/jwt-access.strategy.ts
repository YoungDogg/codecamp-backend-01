import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey', // 복호화 과정
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
