import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryService } from './productCategory.service';

@Resolver()
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Query(() => String)
  sayHi() {
    return 'hi';
  }
  @Mutation(() => ProductCategory)
  async createProductCategory(
    @Args('name') name: string, //
  ) {
    return await this.productCategoryService.create({ name }); // return한 이유, 프론트가 받으라고
  }

  @Mutation(() => Boolean)
  async deleteProductCategory(
    @Args('productCategoryId') productCategoryId: string,
  ) {
    return await this.productCategoryService.delete({ productCategoryId });
  }
}
