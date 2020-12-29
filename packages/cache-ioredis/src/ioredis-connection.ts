import IORedis from 'ioredis';
import { createIORedisConnection } from './ioredis-connection.factory';
import { ConnectionInterface } from '@soluble/cache-interop';

export class IoredisConnection implements ConnectionInterface<IORedis.Redis> {
  private readonly ioRedis: IORedis.Redis;

  /**
   * @param options dsn or IORedis.RedisOptions
   */
  constructor(options: IORedis.RedisOptions | string) {
    this.ioRedis = createIORedisConnection(options);
  }

  async quit(): Promise<boolean> {
    return this.ioRedis.quit().then((resp) => resp === 'OK');
  }

  /**
   * Access directly the wrapped ioredis connection
   * Warning: this is not guarantee by cache-interop API stability
   */
  getWrappedConnection(): IORedis.Redis {
    return this.ioRedis;
  }
}
