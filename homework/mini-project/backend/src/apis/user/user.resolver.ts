import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async fetchProducts() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async fetchProduct(@Args('email') email: string) {
    return await this.userService.findOne({ email });
  }

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
    @Args('point', { nullable: true }) point: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userService.create({
      email,
      hashedPassword,
      name,
      age,
      point,
    });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
    @Args('point', { nullable: true }) point: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.update({
      email,
      hashedPassword,
      name,
      age,
      point,
    });
  }

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
