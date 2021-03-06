import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
// import { BoardModule } from './apis/board-temp/board.module';
// import { Board } from './apis/board-temp/entities/board.entity';
import { BrandModule } from './apis/brand/brand.module';
import { OrderModule } from './apis/order/order.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { ProductModule } from './apis/product/product.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { UserModule } from './apis/user/user.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
@Module({
  imports: [
    OrderModule,
    PointTransactionModule,
    AuthModule,
    BrandModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'miniProject',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      // migrationsRun: true,
      logging: true,
      logger: 'file',
      // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        // migrationsDir: 'src/migrations',
      },
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
