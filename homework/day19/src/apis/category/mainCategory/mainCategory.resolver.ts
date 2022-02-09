import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMainCategoryInput } from './dto/createMainCategory.input';
import { UpdateMainCategoryInput } from './dto/updateMainCategory.input';
import { MainCategoryService } from './mainCategory.service';
import { MainCategory } from './entities/mainCategory.entity';

@Resolver()
export class MainCategoryResolver {
  constructor(private readonly mainCategoryService: MainCategoryService) {}

  // @Query(() => String)
  // sayHello(): string {
  //   return 'Hello World!';
  // }

  @Query(() => [MainCategory])
  fetchProducts() {
    this.mainCategoryService.findAll();
  }

  @Query(() => MainCategory)
  fetchProduct(@Args('id') id: string) {
    this.mainCategoryService.findOne({ id });
  }

  @Mutation(() => MainCategory)
  async createMainCategory(
    @Args('createMainCategoryInput')
    createMainCategoryInput: CreateMainCategoryInput,
  ) {
    await this.mainCategoryService.create({ createMainCategoryInput });
  }

  @Mutation(() => MainCategory)
  async updateMainCategory(
    @Args('id') id: string,
    @Args('updateMainCategoryInput')
    updateMainCategoryInput: UpdateMainCategoryInput,
  ) {
    return await this.mainCategoryService.update({
      id,
      updateMainCategoryInput,
    });
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string) {
    return await this.mainCategoryService.delete({ id });
  }
}
