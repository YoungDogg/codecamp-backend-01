import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductSalesLocationInput } from 'src/apis/productSalesLocation/dto/productSalesLocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => ProductSalesLocationInput, { nullable: true })
  productSalesLocation?: ProductSalesLocationInput;

  @Field(() => String, { nullable: true })
  productCategoryId?: string;

  // 일단 brand만 해보자
  @Field(() => String, { nullable: true })
  id?: string; // brandId

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
