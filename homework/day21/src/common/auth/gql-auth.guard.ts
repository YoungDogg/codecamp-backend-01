import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthAccessGuard extends AuthGuard('access') {
  getRequest(context: ExecutionContext) {
    //브라우저에서 받은 부분
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req; // GraphQL -> Back-end
  }
}
