import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateBrandInput } from './dto/createBrand.input';
import { UpdateBrandInput } from './dto/updateBrand.input';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';

@Resolver()
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  // @Query(() => String)
  // sayHello(): string {
  //   return 'Hello World!';
  // }

  @Query(() => [Brand])
  fetchProducts() {
    this.brandService.findAll();
  }

  @Query(() => Brand)
  fetchProduct(@Args('id') brandId: string) {
    this.brandService.findOne({ brandId });
  }

  @Mutation(() => Brand)
  async createBrand(
    @Args('createBrandInput') createBrandInput: CreateBrandInput,
  ) {
    await this.brandService.create({ createBrandInput });
  }

  @Mutation(() => Brand)
  async updateBrand(
    @Args('brandId') brandId: string,
    @Args('updateBrandInput') updateBrandInput: UpdateBrandInput,
  ) {
    return await this.brandService.update({ brandId, updateBrandInput });
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('brandId') brandId: string) {
    return await this.brandService.delete({ brandId });
  }
}
