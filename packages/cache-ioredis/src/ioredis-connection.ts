import type { ConnectionInterface } from '@soluble/cache-interop';
import type { Redis } from 'ioredis';

export class IoredisConnection implements ConnectionInterface<Redis> {
  private readonly ioRedis: Redis;

  constructor(ioRedis: Redis) {
    this.ioRedis = ioRedis;
  }

  quit = async (): Promise<boolean> => {
    return this.ioRedis.quit().then((resp) => resp === 'OK');
  };

  /**
   * Access directly the wrapped ioredis connection
   * Warning: this is not guarantee by cache-interop API stability
   */
  getNativeConnection(): Redis {
    return this.ioRedis;
  }
}
