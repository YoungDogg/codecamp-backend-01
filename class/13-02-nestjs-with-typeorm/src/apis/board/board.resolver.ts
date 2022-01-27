import { Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.sevice';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => String)
  getHello(): string {
    return this.boardService.getHello();
  }
 
  
}
