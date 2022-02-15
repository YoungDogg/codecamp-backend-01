import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateBrandInput } from './createBrand.input';

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {}
