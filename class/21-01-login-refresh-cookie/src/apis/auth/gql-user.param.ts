import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CONTEXT, GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
  //export를 해야 밖에서 쓸 수 있다.
  id: string;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext): ICurrentUser => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
