import { ConnectionInterface } from '@soluble/cache-interop';

import { RedisClient } from 'redis';

export class RedisConnection implements ConnectionInterface<RedisClient> {
  private readonly redis: RedisClient;

  constructor(redis: RedisClient) {
    this.redis = redis;
  }

  async quit(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.redis.quit((err, reply) => {
        if (err instanceof Error) {
          reject(err.message);
          return;
        }
        resolve(reply === 'OK');
      });
    });
  }

  /**
   * Access directly the wrapped ioredis connection
   * Warning: this is not guarantee by cache-interop API stability
   */
  getWrappedConnection(): RedisClient {
    return this.redis;
  }
}
