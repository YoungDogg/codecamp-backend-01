import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  usr: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

@Controller
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(k
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 가입확인
    let user = await this.userService.findOne({ email: req.user.email });
    // 2. 회원가입
    if (!user) {
      const { password, ...rest } = req.user;
      const createUser = { ...rest, hashedPassword: password };
      user = await this.userService.create({ ...createUser });
    }
    // 3. 로그인
    // 3-1. refreshToken 만들어서 넣어주기
    this.authService.setRefreshToken({ user, res });
    // 3-2. 프론트의 로그인된 페이지로 리다이렉트 쿠키 집어넣어서 보내주기
    res.redirect(
      'http://localhost:5500/class/21-02-login-refresh-restore/frontend/social-login.html',
      // 강사님은 5501번
    );
  }
}
