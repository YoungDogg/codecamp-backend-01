import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCouponCodeInput {
  @Field(() => String)
  name: string;
  @Field(() => Boolean)
  isCouponCodeAvailable: boolean;
  @Field(() => Int)
  discountAmount: number;
}
