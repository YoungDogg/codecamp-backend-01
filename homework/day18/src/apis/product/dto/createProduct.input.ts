import { Field, InputType, Int } from '@nestjs/graphql';
import { SubCategory } from 'src/apis/category/subCategory/entities/subCategory.entity';

@InputType()
export class CreateProductInput {
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
