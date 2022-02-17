import { Strategy, Profile } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
require('dotenv').config();
@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENTID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      // scope: ['email', 'profile'],
      // scope: ['profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('==========accessToken==========');
    console.log(accessToken);
    console.log('===============================');
    console.log('==========refreshToken==========');
    console.log(refreshToken);
    console.log('===============================');
    console.log('==========profile==========');
    console.log(profile);
    console.log('===============================');

    return {
      email: profile._json.kakao_account.email,
      password: profile.id,
      name: profile.username,
      age: 0,
    };
  }
}
