import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './createProduct.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}
