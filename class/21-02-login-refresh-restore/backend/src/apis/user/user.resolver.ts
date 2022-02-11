import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthAccessGuard } from 'backend/src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from '../../common/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    // password = hashedPassword; // 이렇게 하면 되지 않을까
    return await this.userService.create({ email, hashedPassword, name, age });
    // return await this.userService.create({ email, password, name, age }); // user.service.ts에 써 놓은 것과 같은 뜻
  }

  //반드시 로그인이 필요
  // @UseGuards(AuthGuard('access')) // 로그인이 됐는지 안됐는지 검증하는 곳
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(@CurrentUser() currentUser: ICurrentUser) {
    console.log(
      '========fetchUser(@CurrentUser() currentUser: ICurrentUser) 실행됐습니다.========',
    );
    console.log(currentUser);
    return '========실행 완료========';
  }
}
