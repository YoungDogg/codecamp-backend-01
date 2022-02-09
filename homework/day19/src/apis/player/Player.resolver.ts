import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePlayerInput } from './dto/createPlayer.input';
import { UpdatePlayerInput } from './dto/updatePlayer.input';
import { Player } from './entities/player.entity';
import { PlayerService } from './Player.service';
@Resolver()
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  // @Query(() => String)
  // sayHello(): string {
  //   return 'Hello World!';
  // }

  @Query(() => [Player]) // Query graphql에서 임포트 되는지 잘 보자
  fetchProducts() {
    this.playerService.findAll();
  }

  @Query(() => Player)
  fetchProduct(@Args('id') id: string) {
    this.playerService.findOne({ id });
  }

  @Mutation(() => Player)
  async createPlayer(
    @Args('createPlayerInput') createPlayerInput: CreatePlayerInput,
  ) {
    await this.playerService.create({ createPlayerInput });
  }

  @Mutation(() => Player)
  async updatePlayer(
    @Args('id') id: string,
    @Args('updatePlayerInput') updatePlayerInput: UpdatePlayerInput,
  ) {
    return await this.playerService.update({ id, updatePlayerInput });
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string) {
    return await this.playerService.delete({ id });
  }
}
