import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>, //
  ) {}

  async create({ name }) {
    //데이터베이스에 저장
    return await this.productCategoryRepository.save({ name: name }); // 등록(craete)하고 가져오기다. 키, 밸류 같으면 생략 가능 {name : name } -> {name}
  }

  async delete({ productCategoryId }) {
    return await this.productCategoryRepository.delete({
      id: productCategoryId,
    });
  }
}
