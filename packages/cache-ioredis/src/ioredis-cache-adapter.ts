import type {
  CacheInterface,
  CacheKey,
  CacheItemInterface,
  CacheException,
  CacheValueProviderFn,
  SetOptions,
  GetOptions,
  HasOptions,
  DeleteOptions,
  ConnectedCacheInterface,
  ConnectionInterface,
} from '@soluble/cache-interop';
import {
  AbstractCacheAdapter,
  executeValueProviderFn,
  CacheItemFactory,
  Guards,
} from '@soluble/cache-interop';
import type { RedisOptions, Redis } from 'ioredis';
import { IoredisConnection } from './ioredis-connection';
import { createIoRedisConnection } from './ioredis-connection.factory';

type Options = {
  /** Existing connection, IoRedis options or a valid dsn */
  connection: IoredisConnection | RedisOptions | string | Redis;
};

export class IoRedisCacheAdapter<
    TBase = string,
    KBase extends CacheKey = CacheKey,
  >
  extends AbstractCacheAdapter<TBase, KBase>
  implements CacheInterface<TBase, KBase>, ConnectedCacheInterface<Redis>
{
  private readonly conn: IoredisConnection;
  private readonly redis: Redis;
  readonly adapterName: string;
  /**
   * @throws Error
   */
  constructor(options: Options) {
    super();
    const { connection } = options;
    this.adapterName = IoRedisCacheAdapter.prototype.constructor.name;
    this.conn =
      connection instanceof IoredisConnection
        ? connection
        : createIoRedisConnection(connection);
    this.redis = this.conn.getNativeConnection();
  }

  get = async <T = TBase, K extends KBase = KBase>(
    key: K,
    options?: GetOptions<T>
  ): Promise<CacheItemInterface<T>> => {
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
      data = (await this.redis.get(key)) as unknown as T;
    } catch (e) {
      return CacheItemFactory.fromErr<K>({
        key,
        error: this.errorHelper.getCacheException(
          ['get', key],
          'READ_ERROR',
          e
        ),
      });
    }
    const noData = data === null;
    return CacheItemFactory.fromOk<T, K>({
      key,
      data: noData ? defaultValue : data,
      isHit: !noData,
    });
  };

  set = async <T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<boolean | CacheException> => {
    if (!Guards.isValidCacheKey(key)) {
      return this.errorHelper.getInvalidCacheKeyException(['set', key]);
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
        return this.errorHelper.getCacheProviderException(['set', key], e);
      }
    }
    if (v === null) return true;

    if (!Guards.isValidRedisValue(v)) {
      return this.errorHelper.getUnsupportedValueException(['set', key], v);
    }

    const setOp =
      ttl > 0 ? this.redis.setex(key, ttl, v) : this.redis.set(key, v);
    return setOp
      .then((reply) => reply === 'OK')
      .catch((e) => {
        return this.errorHelper.getCacheException(
          ['set', key],
          'WRITE_ERROR',
          e
        );
      });
  };

  has = async <K extends KBase = KBase>(
    key: K,
    options?: HasOptions
  ): Promise<boolean | undefined> => {
    if (!Guards.isValidCacheKey(key)) {
      options?.onError?.(
        this.errorHelper.getInvalidCacheKeyException(['has', key])
      );
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
          this.errorHelper.getCacheException(['has', key], 'COMMAND_ERROR', e)
        );
        return undefined;
      });
  };

  delete = async <K extends KBase = KBase>(
    key: K,
    options?: DeleteOptions
  ): Promise<boolean | CacheException> => {
    if (!Guards.isValidCacheKey(key)) {
      return this.errorHelper.getInvalidCacheKeyException(['delete', key]);
    }
    const { disableCache = false } = options ?? {};
    if (disableCache) {
      return false;
    }
    return this.redis
      .del(key)
      .then((count) => count === 1)
      .catch((e) => {
        return this.errorHelper.getCacheException(
          ['delete', key],
          'WRITE_ERROR',
          e
        );
      });
  };

  clear = async (): Promise<true | CacheException> => {
    return this.redis
      .flushdb()
      .then((_reply): true => true)
      .catch((e) => {
        return this.errorHelper.getCacheException('clear', 'COMMAND_ERROR', e);
      });
  };

  getConnection = (): ConnectionInterface<Redis> => {
    return this.conn;
  };
}
