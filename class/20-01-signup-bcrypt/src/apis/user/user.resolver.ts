import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

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
}
