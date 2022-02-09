import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '../productCategory/entities/productCategory.entity';
import { ProductSalesLocation } from '../productSalesLocation/entities/productSalesLocation.entity';
import { ProductTag } from '../productTag/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductSalesLocation,
      ProductCategory,
      ProductTag,
    ]),
  ],
  //   controllers: [AppController],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
