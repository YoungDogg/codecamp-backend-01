import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
// import { BoardModule } from './apis/board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandModule } from './apis/brand/brand.module';
import { MainCategoryModule } from './apis/category/mainCategory/mainCategory.module';
import { SubCategoryModule } from './apis/category/subCategory/subCategory.module';
import { CouponCodeModule } from './apis/couponcode/couponcode.module';
import { ImageModule } from './apis/image/Image.module';
import { Personalisation } from './apis/personalisation/entities/personalisation.entity';
import { Player } from './apis/player/entities/player.entity';
import { ProductModule } from './apis/product/product.module';
// import { Board } from './apis/board/entities/board.entity';
// import { ProductCategoryModule } from './apis/productCategory/productCategory.module';

@Module({
  imports: [
    MainCategoryModule,
    SubCategoryModule,
    Player,
    Personalisation,
    ImageModule,
    CouponCodeModule,
    BrandModule,
    ProductModule,
    // ProductCategoryModule,
    // BoardModule, //
    GraphQLModule.forRoot({ autoSchemaFile: 'src/common/graphql/schema.gql' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'day18',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true, //
    }),
  ],
})
export class AppModule {}
