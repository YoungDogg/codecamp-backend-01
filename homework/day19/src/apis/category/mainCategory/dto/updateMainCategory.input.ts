import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateMainCategoryInput {
  @Field(() => String)
  name: string;
}
