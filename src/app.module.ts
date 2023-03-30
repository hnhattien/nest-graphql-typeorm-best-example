import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import path from 'path';
import { cwd } from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from '@core/config/database';
import { CacheConfigService } from '@core/config/cache';
import { DateScalar } from '@core/config/graphql/scalars/date.scalar';
import { GraphQLConfigService } from '@core/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '@core/config/jwt';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLConfigService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
