import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBrandInput {
  @Field(() => String)
  name: string;
}
