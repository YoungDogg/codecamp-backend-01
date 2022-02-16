import { Args, EnumOptions, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Order, ORDER_STATUS_ENUM } from './entities/order.entity';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  async fetchOrdersAll() {
    return await this.orderService.findAll();
  }

  @Query(() => Order)
  async fetchOrderOne(@Args('orderId') id: string) {
    return await this.orderService.findOne({ id });
  }

  @Mutation(() => Order)
  async create(
    @Args('email') email: string,
    @Args('productId') productId: string,
    @Args('status', { nullable: true }) status: ORDER_STATUS_ENUM, // 취소일 때만 쓰게 했다.
  ) {
    return await this.orderService.create({ email, productId, status });
  }

  //   @Mutation(() => Order)
  //   async update(
  //     @Args('orderId') id: string,
  //     @Args('email') email: string,
  //     @Args('productId') productId: string,
  //     @Args('status', { nullable: true }) status: ORDER_STATUS_ENUM, // how to enum type arg
  //   ) {
  //     return await this.orderService.update({ id, email, productId, status });
  //   }

  // update, delete는 만들지 않았다.
  // 주문은 취소된 기록이 남지, 업데이트나 삭제되지 않기 때문이다.
}
