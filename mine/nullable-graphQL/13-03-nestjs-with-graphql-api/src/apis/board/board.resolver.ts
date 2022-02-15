import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board], { nullable: 'itemsAndList' })
  fetchBoards(): Board[] {
    return this.boardService.findAll();
  }
}
// @Query(() => [Board])
import { CreateBoardInput } from './dto/createBoard.input';
// @Mutation(() => String)
// createBoard(
//   // @Args('writer') writer: string,
//   // @Args('title') title: string,
//   // @Args('contents') contents: string,
//   @Args('createBoardInput') createBoardInput: CreateBoardInput,
// ): string {
//   return this.boardService.create({
//     createBoardInput,
//   });
// }
