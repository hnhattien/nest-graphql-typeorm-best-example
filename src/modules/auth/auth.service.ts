import { AccessTokenConfigFactory } from '@core/auth/accessTokenConfig.factory';
import { RefreshTokenConfigFactory } from '@core/auth/refreshTokenConfig.factory';
import environments from '@core/environments';
import { SecurityService } from '@core/shared/security';
import { User } from '@modules/user/user.entity';
import { ValidationError } from '@nestjs/apollo';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { Auth, SignUpPayload } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private securityService: SecurityService,
  ) {}
  async signIn(username: string, password: string) {
    let user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!this.isSamePassword(password, user.password)) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }

    let token = this.createToken(user);

    const res = {
      username: user.username,
      avatar: user.avatar,
      sub: user.id,
      token,
    };

    return res;
  }
  async signUp(signupPayload: SignUpPayload) {
    let user = await this.userRepository.findOne({
      where: {
        username: signupPayload.username
      },
    });
    if (user) {
      throw new HttpException('Account existed', HttpStatus.BAD_REQUEST);
    }

    if (signupPayload.repeatPassword !== signupPayload.password) {
      throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await this.securityService.hash(signupPayload.password);
    return this.userRepository.insert({
      username: signupPayload.username,
      password: hashedPassword
    })
  }

  isSamePassword(password: string, hashedPassword: string) {
    return this.securityService.compare(password, hashedPassword);
  }

  private createToken(payload: Partial<User>) {
    const accessTokenConfig = AccessTokenConfigFactory.getInstance();
    const refreshTokenConfig = RefreshTokenConfigFactory.getInstance();
    const access_token = this.jwtService.sign(
      {
        username: payload.username,
        sub: payload.id,
        jti: uuid(),
      },
      accessTokenConfig.signOptions,
    );

    const refresh_token = this.jwtService.sign(
      {
        username: payload.username,
        sub: payload.id,
        jti: uuid(),
      },
      refreshTokenConfig.signOptions,
    );

    return {
      access_token,
      expiresIn: environments.JWT_ACCESS_TOKEN_EXPIRES_IN,
      refresh_token,
      refreshExpiresIn: environments.JWT_REFRESH_TOKEN_EXPIRES_IN,
    };
  }
}
