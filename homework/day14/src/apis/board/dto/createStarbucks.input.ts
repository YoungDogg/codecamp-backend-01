import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStarbucksInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  price: string;
  @Field(() => String)
  kcalPerOnce: string;
  @Field(() => String)
  fat: string;
  @Field(() => String)
  protein: string;
  @Field(() => String)
  salt: string;
  @Field(() => String)
  sugar: string;
  @Field(() => String)
  caffeine: string;
}
