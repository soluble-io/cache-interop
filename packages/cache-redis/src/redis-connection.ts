import { promisify } from 'util';
import type { ConnectionInterface } from '@soluble/cache-interop';

import type { RedisClient } from 'redis';

export class RedisConnection implements ConnectionInterface<RedisClient> {
  private readonly redis: RedisClient;

  constructor(redis: RedisClient) {
    this.redis = redis;
  }

  quit = async (): Promise<boolean> => {
    const asyncQuit = promisify(this.redis.quit).bind(this.redis);
    return asyncQuit()
      .then((reply) => reply === 'OK')
      .catch((_e) => {
        return false;
      });
  };

  /**
   * Access directly the wrapped ioredis connection
   * Warning: this is not guarantee by cache-interop API stability
   */
  getNativeConnection(): RedisClient {
    return this.redis;
  }
}
