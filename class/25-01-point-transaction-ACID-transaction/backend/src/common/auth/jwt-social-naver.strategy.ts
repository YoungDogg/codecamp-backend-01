import { Strategy, Profile } from 'passport-naver-v2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
require('dotenv').config();

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENTID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
      scope: ['email', 'profile'],
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
      email: profile.email,
      password: profile.id,
      name: profile.name,
      age: profile.age.substring(0, 2),
    };
  }
}
