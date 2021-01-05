import { ConnectionInterface } from '@soluble/cache-interop';

import { RedisClient } from 'redis';
import { promisify } from 'util';

export class RedisConnection implements ConnectionInterface<RedisClient> {
  private readonly redis: RedisClient;

  constructor(redis: RedisClient) {
    this.redis = redis;
  }

  quit = async (): Promise<boolean> => {
    const asyncQuit = promisify(this.redis.quit).bind(this.redis);
    return await asyncQuit()
      .then((reply) => reply === 'OK')
      .catch((e) => {
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
