import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field(() => Boolean)
  isThumbnail: boolean;
  @Field(() => String)
  imageURL: string;
}
