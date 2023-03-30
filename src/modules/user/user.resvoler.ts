import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @Query((returns) => [User])
  async allUsers(
    @Args('first', { type: () => Int,nullable: true }) first: number,
    @Args('skip', { type: () => Int, nullable: true }) skip: number,
  ) {
    return this.userService.findAll({
      take: first,
      skip: skip,
    });
  }
}
