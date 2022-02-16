import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
  ) {}

  async fetchPointsAll() {
    return await this.pointTransactionService.findAll();
  }

  async fetchPointOne(@Args('pointId') id: string) {
    return await this.pointTransactionService.findOne({ id });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async createPointTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.pointTransactionService.create({
      impUid,
      amount,
      currentUser,
    });
  }
}
