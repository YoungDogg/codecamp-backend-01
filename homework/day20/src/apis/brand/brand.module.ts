import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { BrandResolver } from './brand.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  //   controllers: [AppController],
  providers: [BrandResolver, BrandService],
})
export class BrandModule {}
