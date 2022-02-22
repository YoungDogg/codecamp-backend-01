import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ImageEntity } from './entities/image.entity';
import { ImageService } from './image.service';

// 추가할 것----------
// 1. Args : IInput
//--------------------
@Resolver()
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}
  @Query(() => [ImageEntity])
  async fetchImagesAll() {
    return await this.imageService.findAll();
  }
  @Query(() => ImageEntity)
  async fetchImageOne(@Args('imageId') imageId: string) {
    return await this.imageService.findOne({ imageId });
  }
  @Mutation(() => ImageEntity)
  async createImage(
    @Args('productId', { nullable: true }) productId: string,
    @Args('imageUrl') imageUrl: string,
    @Args('isThumbnail', { nullable: true }) isThumbnail?: boolean,
  ) {
    return await this.imageService.create({ productId, isThumbnail, imageUrl });
  }
  @Mutation(() => ImageEntity)
  async updateImage(
    @Args('productId', { nullable: true }) productId: string,
    @Args('isThumbnail', { nullable: true }) isThumbnail?: boolean,
    @Args('imageUrl', { nullable: true }) imageUrl?: string,
  ) {
    return await this.imageService.update({
      productId,
      imageUrl,
      isThumbnail,
    });
  }
  @Mutation(() => Boolean) // true or false를 리턴하니까
  async deleteImage(@Args('imageId') imageId: string) {
    return await this.imageService.delete({ imageId });
  }
}
