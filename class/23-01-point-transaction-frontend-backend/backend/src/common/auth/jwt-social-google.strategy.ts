import { Strategy, Profile } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '1070270045707-499lvtikj73bap9f9svtueqrfjb4ibak.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('==========accessToken==========');
    console.log(accessToken);
    console.log('===============================');
    console.log('==========refreshToken==========');
    console.log(refreshToken);
    console.log('===============================');
    console.log('==========refreshToken==========');
    console.log(profile);
    console.log('===============================');
    return {
      email: profile.emails[0].value,
      password: profile.id,
      name: profile.displayName,
      age: 0,
    };
  }
}
