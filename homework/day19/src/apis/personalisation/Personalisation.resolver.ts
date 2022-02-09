import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePersonalisationInput } from './dto/createPersonalisation.input';
import { UpdatePersonalisationInput } from './dto/updatePersonalisation.input';
import { Personalisation } from './entities/personalisation.entity';
import { PersonalisationService } from './Personalisation.service';
@Resolver()
export class PersonalisationResolver {
  constructor(private readonly personalisationService: PersonalisationService) {}

  // @Query(() => String)
  // sayHello(): string {
  //   return 'Hello World!';
  // }

  @Query(() => [Personalisation]) // Query graphql에서 임포트 되는지 잘 보자
  fetchProducts() {
    this.personalisationService.findAll();
  }

  @Query(() => Personalisation)
  fetchProduct(@Args('id') id: string) {
    this.personalisationService.findOne({ id });
  }

  @Mutation(() => Personalisation)
  async createPersonalisation(
    @Args('createPersonalisationInput') createPersonalisationInput: CreatePersonalisationInput,
  ) {
    await this.personalisationService.create({ createPersonalisationInput });
  }

  @Mutation(() => Personalisation)
  async updatePersonalisation(
    @Args('id') id: string,
    @Args('updatePersonalisationInput') updatePersonalisationInput: UpdatePersonalisationInput,
  ) {
    return await this.personalisationService.update({ id, updatePersonalisationInput });
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string) {
    return await this.personalisationService.delete({ id });
  }
}
