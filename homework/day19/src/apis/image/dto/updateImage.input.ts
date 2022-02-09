import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateImageInput {
  @Field(() => Boolean)
  isThumbnail: boolean;
  @Field(() => String)
  imageURL: string;
}
