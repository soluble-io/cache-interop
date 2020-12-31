import {
  CacheInterface,
  CacheKey,
  AbstractCacheAdapter,
  CacheItemInterface,
  CacheException,
  executeValueProviderFn,
  CacheValueProviderFn,
  SetOptions,
  CacheProviderException,
  GetOptions,
  HasOptions,
  DeleteOptions,
  ConnectedCacheInterface,
  ConnectionInterface,
  CacheItemFactory,
  Guards,
  ErrorFormatter,
  InvalidCacheKeyException,
  UnsupportedValueException,
} from '@soluble/cache-interop';
import IORedis from 'ioredis';
import { IoredisConnection } from './ioredis-connection';
import { createIoRedisConnection } from './ioredis-connection.factory';

type Options = {
  /** Existing connection, IoRedis options or a valid dsn */
  connection: IoredisConnection | IORedis.RedisOptions | string | IORedis.Redis;
};

export class IoRedisCacheAdapter<TBase = string, KBase extends CacheKey = CacheKey>
  extends AbstractCacheAdapter<TBase, KBase>
  implements CacheInterface<TBase, KBase>, ConnectedCacheInterface<IORedis.Redis> {
  private readonly conn: IoredisConnection;
  private readonly redis: IORedis.Redis;
  private getErrMsg: ErrorFormatter['getMsg'];

  /**
   * @throws Error
   */
  constructor(options: Options) {
    super();
    const { connection } = options;
    this.conn = connection instanceof IoredisConnection ? connection : createIoRedisConnection(connection);
    this.redis = this.conn.getNativeConnection();
    this.getErrMsg = new ErrorFormatter(IoRedisCacheAdapter.prototype.constructor.name).getMsg;
  }

  get = async <T = TBase, K extends KBase = KBase>(key: K, options?: GetOptions<T>): Promise<CacheItemInterface<T>> => {
    if (!Guards.isValidCacheKey(key)) {
      return CacheItemFactory.fromInvalidCacheKey(key);
    }

    const { defaultValue = null, disableCache = false } = options ?? {};
    if (disableCache) {
      return CacheItemFactory.fromCacheMiss<T, K>({
        key,
        defaultValue,
      });
    }
    let data: T;
    try {
      data = ((await this.redis.get(key)) as unknown) as T;
    } catch (e) {
      return CacheItemFactory.fromErr<K>({
        key,
        error: new CacheException({
          previousError: e,
          message: this.getErrMsg('get', 'READ_ERROR', e?.message),
        }),
      });
    }
    if (data === null) {
      return CacheItemFactory.fromCacheMiss<T, K>({
        key,
        defaultValue,
      });
    }
    return CacheItemFactory.fromOk<T, K>({
      key,
      data,
      isHit: true,
    });
  };
  set = async <T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<boolean | CacheException> => {
    if (!Guards.isValidCacheKey(key)) {
      return new InvalidCacheKeyException({ key });
    }
    const { ttl = 0, disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    let v = value;
    if (Guards.isCacheValueProviderFn(value)) {
      try {
        v = await executeValueProviderFn<T>(value);
      } catch (e) {
        return new CacheProviderException({
          previousError: e,
          message: this.getErrMsg('set', 'EXECUTE_ASYNC_ERROR', e?.message),
        });
      }
    }
    if (v === null) return true;

    if (!Guards.isValidRedisValue(v)) {
      return new UnsupportedValueException({ message: this.getErrMsg('set', 'UNSUPPORTED_VALUE', typeof v) });
    }

    const setOp = ttl > 0 ? this.redis.setex(key, ttl, v) : this.redis.set(key, v);
    return setOp
      .then((reply) => reply === 'OK')
      .catch((e) => {
        return new CacheException({
          message: this.getErrMsg('set', 'WRITE_ERROR', e?.message),
        });
      });
  };

  has = async <K extends KBase = KBase>(key: K, options?: HasOptions): Promise<boolean | undefined> => {
    if (!Guards.isValidCacheKey(key)) {
      options?.onError?.(new InvalidCacheKeyException({ key }));
      return undefined;
    }
    const { disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    return this.redis
      .exists(key)
      .then((count) => count === 1)
      .catch((e) => {
        options?.onError?.(
          new InvalidCacheKeyException({ key, message: this.getErrMsg('has', 'COMMAND_ERROR', e?.message) })
        );
        return undefined;
      });
  };

  delete = async <K extends KBase = KBase>(key: K, options?: DeleteOptions): Promise<boolean | CacheException> => {
    if (!Guards.isValidCacheKey(key)) {
      return new InvalidCacheKeyException({ key });
    }
    const { disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    return this.redis
      .del(key)
      .then((count) => count === 1)
      .catch((e) => {
        return new InvalidCacheKeyException({ key, message: this.getErrMsg('delete', 'WRITE_ERROR', e?.message) });
      });
  };

  clear = async (): Promise<true | CacheException> => {
    return this.redis
      .flushdb()
      .then((reply): true => true)
      .catch((e) => {
        return new CacheException({
          message: this.getErrMsg('clear', 'COMMAND_ERROR', e?.message),
          previousError: e,
        });
      });
  };

  getConnection(): ConnectionInterface<IORedis.Redis> {
    return this.conn;
  }
}
