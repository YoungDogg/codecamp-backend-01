import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategoryService } from './mainCategory.service';
import { MainCategory } from './entities/mainCategory.entity';
import { MainCategoryResolver } from './mainCategory.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([MainCategory])],
  //   controllers: [AppController],
  providers: [MainCategoryResolver, MainCategoryService],
})
export class MainCategoryModule {}
