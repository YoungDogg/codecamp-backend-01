import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './apis/brand/entities/brnad.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my_database',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'myproject',
      // entities: [__dirname + '/../apis/**/*.entity.*'],
      // entities: ["dist/**/**.entity{.ts,.js}"], 
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true, //
    }),
  ],
})
export class AppModule {}
