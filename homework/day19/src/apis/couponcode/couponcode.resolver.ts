import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCouponCodeInput } from './dto/createCouponCode.input';
import { UpdateCouponCodeInput } from './dto/updateCouponCodeinput';
import { CouponCodeService } from './couponcode.service';
import { CouponCode } from './entities/couponcode.entity';

@Resolver()
export class CouponCodeResolver {
  constructor(private readonly couponCodeService: CouponCodeService) {}

  // @Query(() => String)
  // sayHello(): string {
  //   return 'Hello World!';
  // }

  @Query(() => [CouponCode]) // Query graphql에서 임포트 되는지 잘 보자
  fetchProducts() {
    this.couponCodeService.findAll();
  }

  @Query(() => CouponCode)
  fetchProduct(@Args('id') id: string) {
    this.couponCodeService.findOne({ id });
  }

  @Mutation(() => CouponCode)
  async createCouponCode(
    @Args('createCouponCodeInput') createCouponCodeInput: CreateCouponCodeInput,
  ) {
    await this.couponCodeService.create({ createCouponCodeInput });
  }

  @Mutation(() => CouponCode)
  async updateCouponCode(
    @Args('id') id: string,
    @Args('updateCouponCodeInput') updateCouponCodeInput: UpdateCouponCodeInput,
  ) {
    return await this.couponCodeService.update({ id, updateCouponCodeInput });
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string) {
    return await this.couponCodeService.delete({ id });
  }
}
