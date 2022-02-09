import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateImageInput } from './dto/createImage.input';
import { UpdateImageInput } from './dto/updateImage.input';
import { Image } from './entities/image.entity';
import { ImageService } from './Image.service';
@Resolver()
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  // @Query(() => String)
  // sayHello(): string {
  //   return 'Hello World!';
  // }

  @Query(() => [Image]) // Query graphql에서 임포트 되는지 잘 보자
  fetchProducts() {
    this.imageService.findAll();
  }

  @Query(() => Image)
  fetchProduct(@Args('id') id: string) {
    this.imageService.findOne({ id });
  }

  @Mutation(() => Image)
  async createImage(
    @Args('createImageInput') createImageInput: CreateImageInput,
  ) {
    await this.imageService.create({ createImageInput });
  }

  @Mutation(() => Image)
  async updateImage(
    @Args('id') id: string,
    @Args('updateImageInput') updateImageInput: UpdateImageInput,
  ) {
    return await this.imageService.update({ id, updateImageInput });
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string) {
    return await this.imageService.delete({ id });
  }
}
