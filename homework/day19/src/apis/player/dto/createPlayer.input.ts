import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePlayerInput {
  @Field(() => String)
  name: string;
}
