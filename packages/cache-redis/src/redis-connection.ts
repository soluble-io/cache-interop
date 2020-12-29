import { ConnectionInterface } from '@soluble/cache-interop';

import { RedisClient, ClientOpts as RedisClientOptions } from 'redis';
import { createRedisConnection } from './redis-connection.factory';

export class RedisConnection implements ConnectionInterface<RedisClient> {
  private readonly redis: RedisClient;

  /**
   * @param options - dsn or redis.ClientOpts
   */
  constructor(options: RedisClientOptions | string) {
    this.redis = createRedisConnection(options);
  }

  async quit(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.redis.quit((err, reply) => {
        if (err) {
          reject(err.message);
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
