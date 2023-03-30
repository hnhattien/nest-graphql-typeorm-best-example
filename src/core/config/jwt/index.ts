import environments from '@core/environments';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      signOptions: {
        algorithm: 'HS256',
      },
    };
  }
}
