import { CacheModuleOptions, CacheOptionsFactory, CacheStore } from "@nestjs/common";
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions, RedisFunctions, RedisModules, RedisScripts } from "redis";
export class CacheConfigService implements CacheOptionsFactory<RedisClientOptions> {
    createCacheOptions(): CacheModuleOptions<RedisClientOptions<RedisModules, RedisFunctions, RedisScripts>> | Promise<CacheModuleOptions<RedisClientOptions<RedisModules, RedisFunctions, RedisScripts>>> {
        return {
            store: redisStore as unknown as CacheStore,
            url: 'redis://localhost:6379'
        }
    }
    
}