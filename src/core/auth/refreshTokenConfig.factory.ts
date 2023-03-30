import environments from '@core/environments';
import { Auth, RefreshTokenPayload } from '@modules/auth/auth.type';
import { User } from '@modules/user/user.entity';
import { Injectable, Scope } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';


export class RefreshTokenConfigFactory {
  static instance: RefreshTokenConfigFactory;
  signOptions: JwtSignOptions;
  verifyOptions: JwtVerifyOptions;
  private constructor() {
    this.signOptions = {
      algorithm: 'HS256',
      secret: environments.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: environments.JWT_REFRESH_TOKEN_EXPIRES_IN,
    };
    this.verifyOptions = {
      algorithms: ['HS256'],
      secret: environments.JWT_REFRESH_TOKEN_SECRET,
    };
  }
  
  static getInstance() {
    return RefreshTokenConfigFactory.instance ? RefreshTokenConfigFactory.instance : new RefreshTokenConfigFactory();
  }
}
