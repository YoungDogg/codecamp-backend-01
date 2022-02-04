import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStarbucksInput } from './dto/createStarbucks.input';
import { Starbucks } from './entities/starbucks.entity';
import { StarbucksService } from './starbucks.service';
@Resolver()
export class StarbucksResolver {
  constructor(private readonly starbucskService: StarbucksService) {}

  @Query(() => [Starbucks])
  fetchStarbucks(): Starbucks[] {
    return this.starbucskService.fetchStarbucks();
  }
  
  @Mutation(() => String)
  createStarbucks(
    @Args('CreateStarbucksInput') CreateStarbucksInput: CreateStarbucksInput,
  ): string {
    return this.starbucskService.create({
      CreateStarbucksInput,
    });
  }
}
