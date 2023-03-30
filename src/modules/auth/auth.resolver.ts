import { Args, Context, GraphQLExecutionContext, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { Auth, SignInResponse } from './auth.type';
import { AuthService } from './auth.service';
import { Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import * as moment from 'moment';
import environments from '@core/environments';
import { User } from '@modules/user/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => SignInResponse)
  async signIn(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
    @Context() ctx: GraphQLExecutionContext & {res: Response, req: Request},
  ) {
    let data = await this.authService.signIn(username, password);
    ctx.res
      .cookie('token', data.token, {
        httpOnly: true,
        sameSite: true,
        expires: moment(new Date())
          .add(environments.JWT_REFRESH_TOKEN_EXPIRES_IN)
          .toDate(),
      });
    return data;
  }

  @Mutation((returns) => User)
  async signUp(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
    @Args('repeatPassword', { type: () => String }) repeatPassword: string,
  ) {
    return this.authService.signUp({
      username,
      password,
      repeatPassword,
    });
  }
}
