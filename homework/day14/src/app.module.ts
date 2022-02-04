import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/board/board.module';
import { StarbucksModule } from './apis/starbucks/starbucks.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Board } from './apis/board/entities/board.entity';
// import { Starbucks } from './apis/starbucks/entities/starbucks.entity';

@Module({
  imports: [
    BoardModule, //
    StarbucksModule,
    GraphQLModule.forRoot({ autoSchemaFile: 'src/common/graphql/schema.gql' }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql', //데이터 베이스 타입
    //   host: 'localhost', //local 환경으로 진행
    //   port: 3306, //mysql은 기본 port는 3306
    //   username: 'root', //mysql은 기본 user는 root로 지정
    //   password: '123456789', //설치 과정에서 설정한 비밀번호
    //   database: 'mysql', //연결할 데이터 베이스명
    //   entities: [Board, Starbucks], //데이터 베이스와 연결할 entity
    //   synchronize: true, //연결과 동시에 테이블을 초기화 혹은 생성할 것인지
    //   logging: true, //콘솔창에 log를 표시하는지
    // }),
  ],
})
export class AppModule {}
