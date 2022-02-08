import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  productDescription?: string;
  @Field(() => String, { nullable: true })
  shippingDescription?: string;
  @Field(() => String, { nullable: true })
  size?: string;
  @Field(() => Int, { nullable: true })
  price?: number;
  @Field(() => Int, { nullable: true })
  stock?: number;
}
