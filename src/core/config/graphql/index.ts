import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import * as path from 'path';
import { cwd } from 'process';

@Injectable()
export class GraphQLConfigService
  implements GqlOptionsFactory<GqlModuleOptions>
{
  createGqlOptions():
    | Omit<GqlModuleOptions<any>, 'driver'>
    | Promise<Omit<GqlModuleOptions<any>, 'driver'>> {
    return {
      sortSchema: true,
      //typePaths: [path.join(cwd(), 'src/typeDefs/**/*.graphql'), path.join(cwd(), 'src/typeDefs/**/*.gql')],
      autoSchemaFile: 'src/core/typeDefs/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    };
  }
}
