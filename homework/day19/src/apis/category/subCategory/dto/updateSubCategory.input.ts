import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateSubCategoryInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  mainCategoryId: string;
}
