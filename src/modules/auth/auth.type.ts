import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Token {
  @Field((type) => String, { nullable: false })
  access_token: string;

  @Field((type) => String, { nullable: false })
  expiresIn: string;

  @Field((type) => String)
  refresh_token: string;

  @Field((type) => String)
  refreshExpiresIn?: string;
}

@ObjectType()
class Auth {
  @Field((type) => String)
  username: string;
  @Field((type) => String, { nullable: true })
  avatar: string;

  @Field((type) => Int, { nullable: true })
  sub: number;

  @Field((type) => Token)
  token: Token;
}

@ObjectType()
class SignInResponse {
  @Field((type) => String)
  username: string;
  @Field((type) => String, { nullable: true })
  avatar?: string;

  @Field((type) => String, { nullable: true })
  sub: string;

  @Field((type) => Token)
  token: Token;
}

@ObjectType()
class SignUpResponse {
  @Field(type => String)
  id: string

  @Field((type) => String)
  username: string;

  @Field((type) => String, { nullable: true })
  avatar?: string;
}

@ObjectType()
class RefreshTokenPayload {
  @Field((type) => String)
  refresh_token: string;

  @Field((type) => String)
  access_token: string;
}

@ObjectType()
class SignUpPayload {
  @Field((type) => String)
  username: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  repeatPassword: string;
}

export { Auth, Token, RefreshTokenPayload, SignUpPayload, SignUpResponse, SignInResponse };
