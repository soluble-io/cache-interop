import type { RedisClientType } from '@redis/client';
import type { ConnectionInterface } from '@soluble/cache-interop';

export class RedisConnection implements ConnectionInterface<RedisClientType> {
  private readonly redis: RedisClientType;

  constructor(redis: RedisClientType) {
    this.redis = redis;
  }

  quit = async (): Promise<boolean> => {
    await this.redis.quit();
    return true;
  };

  /**
   * Access directly the wrapped ioredis connection
   * Warning: this is not guarantee by cache-interop API stability
   */
  getNativeConnection(): RedisClientType {
    return this.redis;
  }
}
