import type { ConnectionInterface } from '@soluble/cache-interop';
import type IORedis from 'ioredis';

export class IoredisConnection implements ConnectionInterface<IORedis.Redis> {
  private readonly ioRedis: IORedis.Redis;

  constructor(ioRedis: IORedis.Redis) {
    this.ioRedis = ioRedis;
  }

  quit = async (): Promise<boolean> => {
    return this.ioRedis.quit().then((resp) => resp === 'OK');
  };

  /**
   * Access directly the wrapped ioredis connection
   * Warning: this is not guarantee by cache-interop API stability
   */
  getNativeConnection(): IORedis.Redis {
    return this.ioRedis;
  }
}
