import environments from '@core/environments';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: environments.DB_HOST,
      database: environments.DB_DATABASE,
      port: environments.DB_PORT,
      password: environments.DB_PWD,
      autoLoadEntities: true,
      entities: getMetadataArgsStorage().tables.map((tb) => tb.target),
    };
  }
}
