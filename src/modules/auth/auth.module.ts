import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '@core/config/jwt';
import { UserModule } from '@modules/user/user.module';
import { SecurityService } from '@core/shared/security';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    UserModule
  ],
  providers: [AuthService, SecurityService, AuthResolver],
  controllers: [AuthController],
})
export class AuthModule {}
