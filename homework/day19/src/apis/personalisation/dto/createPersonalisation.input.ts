import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePersonalisationInput {
  @Field(() => Boolean)
  isPersonalisationAvailable: boolean;

  @Field(() => String)
  name: string;

  @Field(() => String)
  armBadge: string;

  @Field(() => String)
  customContents: string; //Boolean으로 대체 예정
}
