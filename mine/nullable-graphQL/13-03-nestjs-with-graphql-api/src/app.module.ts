import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/board/board.module';
import { Board } from './apis/board/entities/board.entity';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    BoardModule, //
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '123456789',
    //   database: 'boardTable',
    //   entities: [Board],
    //   synchronize: true,
    //   logging: true,
    // }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
