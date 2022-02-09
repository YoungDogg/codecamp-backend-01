import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSubCategoryInput } from './dto/createSubCategory.input';
import { UpdateSubCategoryInput } from './dto/updateSubCategory.input';
import { SubCategoryService } from './subCategory.service';
import { SubCategory } from './entities/subCategory.entity';

@Resolver()
export class SubCategoryResolver {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  // @Query(() => String)
  // sayHello(): string {
  //   return 'Hello World!';
  // }

  @Query(() => [SubCategory])
  fetchProducts() {
    this.subCategoryService.findAll();
  }

  @Query(() => SubCategory)
  fetchProduct(@Args('id') id: string) {
    this.subCategoryService.findOne({ id });
  }

  @Mutation(() => SubCategory)
  async createSubCategory(
    @Args('createSubCategoryInput')
    createSubCategoryInput: CreateSubCategoryInput,
  ) {
    await this.subCategoryService.create({ createSubCategoryInput });
  }

  @Mutation(() => SubCategory)
  async updateSubCategory(
    @Args('id') id: string,
    @Args('updateSubCategoryInput')
    updateSubCategoryInput: UpdateSubCategoryInput,
  ) {
    return await this.subCategoryService.update({ id, updateSubCategoryInput });
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string) {
    return await this.subCategoryService.delete({ id });
  }
}
