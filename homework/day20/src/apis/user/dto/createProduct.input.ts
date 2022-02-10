import { InputType, Field, Int } from '@nestjs/graphql';
import { ProductSaleslocationInput } from 'src/apis/productSaleslocation/dto/productSaleslocation.input';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;
}
