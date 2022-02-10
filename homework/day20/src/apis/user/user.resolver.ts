import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async fetchProducts() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async fetchProduct(@Args('userId') userId: string) {
    return await this.userService.findOne({ userId });
  }

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    return await this.userService.create({ email, password, name, age });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    return await this.userService.update({ email, password, name, age });
  }
}
