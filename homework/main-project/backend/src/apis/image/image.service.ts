import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { ImageEntity } from './entities/image.entity';

// 추가할 것----------
// 1. queryRunner
// 2. Args : IInput
//--------------------
@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ImageEntity)
    private readonly imageEntityRepository: Repository<ImageEntity>,
  ) {}

  async findAll() {
    return await this.imageEntityRepository.find();
  }

  async findOne({ imageId }) {
    return await this.imageEntityRepository.findOne({ id: imageId });
  }

  async create({ productId, isThumbnail, imageUrl }) {
    //기존에 같은 이미지가 있는지 확인
    const imgInsideDB = await this.imageEntityRepository.findOne({ imageUrl });
    if (imgInsideDB) throw new ConflictException('이미 등록된 이미지 입니다');
    return await this.imageEntityRepository.save({
      productId,
      isThumbnail,
      imageUrl,
    });
  }

  async update({ productId, imageUrl, isThumbnail }) {
    const product = await this.productRepository.findOne({ id: productId });
    if (!product) throw new UnprocessableEntityException('없는 물품ID입니다');
    const imagesArr = await this.imageEntityRepository.find();

    imagesArr.map(async (img) => {
      if (img.product.id === productId) await this.delete({ imageId: img.id });
    });

    this.create({ productId, imageUrl, isThumbnail });
  }

  async delete({ imageId }) {
    const result = await this.imageEntityRepository.softDelete({ id: imageId });
    return result.affected ? true : false;
  }
}
