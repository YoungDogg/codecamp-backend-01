import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageService } from './Image.service';
import { ImageResolver } from './Image.resolver';
import { Image } from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  //   controllers: [AppController],
  providers: [ImageResolver, ImageService],
})
export class ImageModule {}
