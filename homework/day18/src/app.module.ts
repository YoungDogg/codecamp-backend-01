import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
// import { BoardModule } from './apis/board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './apis/product/product.module';
// import { Board } from './apis/board/entities/board.entity';
// import { ProductCategoryModule } from './apis/productCategory/productCategory.module';

@Module({
  imports: [
    ProductModule,
    // ProductCategoryModule,
    // BoardModule, //
    GraphQLModule.forRoot({ autoSchemaFile: 'src/common/graphql/schema.gql' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my_database',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'myproject',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true, //
    }),
  ],
})
export class AppModule {}
