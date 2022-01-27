import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/board/entities/board.entity';

@Module({
  imports: [
    BoardModule, //
    GraphQLModule.forRoot({ autoSchemaFile: 'src/common/graphql/schema.gql' }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: ' localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '123456789',
    //   database: 'mysql',
    //   entities: [Board],
    //   synchronize: true,
    //   logging: true, //
    // }),
  ],
})
export class AppModule {}
