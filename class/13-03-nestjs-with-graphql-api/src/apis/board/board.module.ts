import { Module } from '@nestjs/common'; 
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.sevice';

@Module({
  //   imports: [],
  //   controllers: [AppController],
  providers: [BoardResolver, BoardService],
})
export class BoardModule {}
