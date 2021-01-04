import {
  CacheInterface,
  CacheKey,
  AbstractCacheAdapter,
  CacheItemInterface,
  CacheException,
  executeValueProviderFn,
  CacheValueProviderFn,
  SetOptions,
  GetOptions,
  HasOptions,
  DeleteOptions,
  ConnectionInterface,
  ConnectedCacheInterface,
  CacheItemFactory,
  Guards,
  InvalidCacheKeyException,
} from '@soluble/cache-interop';
import {
  RedisClient,
  ClientOpts as RedisClientOptions,
  AbortError,
  AggregateError,
  ReplyError,
  RedisError,
} from 'redis';
import { RedisConnection } from './redis-connection';
import { createRedisConnection } from './redis-connection.factory';
import { promisify } from 'util';

type Options = {
  /** Existing connection, IoRedis options or a valid dsn */
  connection: RedisConnection | RedisClientOptions | string | RedisClient;
};

export class RedisCacheAdapter<TBase = string, KBase extends CacheKey = CacheKey>
  extends AbstractCacheAdapter<TBase, KBase>
  implements CacheInterface<TBase, KBase>, ConnectedCacheInterface<RedisClient> {
  private readonly redis: RedisClient;
  private conn: RedisConnection;
  readonly adapterName: string;

  /**
   * @throws Error if redis connection can't be created
   */
  constructor(options: Options) {
    super();
    const { connection } = options;
    this.adapterName = RedisCacheAdapter.prototype.constructor.name;
    this.conn = connection instanceof RedisConnection ? connection : createRedisConnection(connection);
    this.redis = this.conn.getNativeConnection();
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
    return new Promise((resolve) => {
      this.redis.get(key, (err, data) => {
        if (err !== null) {
          resolve(
            CacheItemFactory.fromErr<K>({
              key,
              error: this.errorHelper.getCacheException('get', 'READ_ERROR', err),
            })
          );
        } else if (data === null) {
          resolve(
            CacheItemFactory.fromCacheMiss<T, K>({
              key,
              defaultValue,
            })
          );
        } else {
          resolve(
            CacheItemFactory.fromOk<T, K>({
              key,
              data: (data as unknown) as T,
              isHit: true,
            })
          );
        }
      });
    });
  };
  set = async <T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<boolean | CacheException> => {
    if (!Guards.isValidCacheKey(key)) {
      return this.errorHelper.getInvalidCacheKeyException('set', key);
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
        return this.errorHelper.getCacheProviderException('set', e);
      }
    }
    if (v === null) return true;

    if (!Guards.isValidRedisValue(v)) {
      return this.errorHelper.getUnsupportedValueException('set', v);
    }

    const setAsync = promisify(this.redis.set).bind(this.redis);
    const setExAsync = promisify(this.redis.setex).bind(this.redis);

    const setOp = ttl > 0 ? setExAsync(key, ttl, v) : setAsync(key, v);
    return setOp
      .then((reply) => reply === 'OK')
      .catch((e) => {
        return this.errorHelper.getCacheException('set', 'WRITE_ERROR', e);
      });
  };

  has = async <K extends KBase = KBase>(key: K, options?: HasOptions): Promise<boolean | undefined> => {
    if (!Guards.isValidCacheKey(key)) {
      options?.onError?.(this.errorHelper.getInvalidCacheKeyException('has', key));
      return undefined;
    }
    const { disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    const existsAsync = promisify(this.redis.exists).bind(this.redis) as (k: string) => Promise<number>;
    return existsAsync(key)
      .then((count) => count === 1)
      .catch((e) => {
        options?.onError?.(this.errorHelper.getCacheException('has', 'COMMAND_ERROR', e));
        return undefined;
      });
  };

  delete = async <K extends KBase = KBase>(key: K, options?: DeleteOptions): Promise<boolean | CacheException> => {
    if (!Guards.isValidCacheKey(key)) {
      return this.errorHelper.getInvalidCacheKeyException('set', key);
    }
    const { disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    const asyncDel = promisify(this.redis.del).bind(this.redis) as (k: string) => Promise<number>;
    return asyncDel(key)
      .then((count) => count === 1)
      .catch((e) => {
        return this.errorHelper.getCacheException('delete', 'WRITE_ERROR', e);
      });
  };

  clear = async (): Promise<true | CacheException> => {
    const asyncFlushDb = promisify(this.redis.flushdb).bind(this.redis);
    return asyncFlushDb()
      .then((reply): true => true)
      .catch((e) => {
        return this.errorHelper.getCacheException('clear', 'COMMAND_ERROR', e);
      });
  };

  getConnection(): ConnectionInterface<RedisClient> {
    return this.conn;
  }
}
