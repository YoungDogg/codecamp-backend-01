import { Field, Float, InputType, OmitType } from '@nestjs/graphql';
import { ProductSalesLocation } from '../entities/productSalesLocation.entity';

@InputType()
export class ProductSalesLocationInput extends OmitType(
  ProductSalesLocation,
  ['id'],
  InputType, // id 빼고 인풋타입으로 만들어줘~
) {
//   @Field(() => String)
//   address: string;
//   @Field(() => String)
//   addressDetail: string;
//   @Field(() => Float)
//   lat: number;
//   @Field(() => Float)
//   lng: number;
//   @Field(() => Date)
//   arriveAt: Date;
}
