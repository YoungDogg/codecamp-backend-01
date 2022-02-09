import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryService } from './subCategory.service';
import { SubCategory } from './entities/subCategory.entity';
import { SubCategoryResolver } from './subCategory.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory])],
  //   controllers: [AppController],
  providers: [SubCategoryResolver, SubCategoryService],
})
export class SubCategoryModule {}
