import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Board } from './entities/board.entity';
import { BoardService } from './board.sevice';
import { CreateBoardInput } from './dto/createBoard.input';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board])
  fetchBoards(): Board[] {
    return this.boardService.findAll();
  }
  @Mutation(() => String)
  createBoard(
    @Args('writer') writer: string,
    @Args('title') title: string,
    @Args('contents') contents: string,
    @Args('CreateBoardInput') CreateBoardInput: CreateBoardInput,
  ): string {
    return this.boardService.create({
      writer,
      title,
      contents,
      CreateBoardInput,
    });
  }
}
