import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  //   @Query(() => String)
  //   sayHello(): string {
  //     return 'Hello World!';
  //   }
  @Query(() => [Product]) // Query graphql에서 임포트 되는지 잘 보자
  fetchProducts() {
    this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string) {
    this.productService.findOne({ productId });
  }
  @Query(() => Product)
  isSoldout(@Args('productId') productId: string) {
    this.productService.checkSoldout({ productId });
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    await this.productService.create({ createProductInput }); // 상품 등록
  }
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    await this.productService.checkSoldout({ productId });

    return await this.productService.update({ productId, updateProductInput });
  }
}
