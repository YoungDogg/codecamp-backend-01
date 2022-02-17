import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
  id: string;
  email: string;
}
export const CurrentUser = createParamDecorator(
  // (data: any, context: ExecutionContext): ICurrentUser => {
  (data: unknown, context: ExecutionContext): ICurrentUser => {
    const ctx = GqlExecutionContext.create(context);
    // console.log('ctx===============');
    // console.log(ctx.getContext());
    return ctx.getContext().req.user;
  },
);

// const aaa = (aaa: string, bbb: string): number => {
//     return 333
// }
