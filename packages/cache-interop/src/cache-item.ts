import { CacheExpiresAt, CacheItemInterface, CacheItemMetadata, CacheItemStats } from './cache-item.interface';
import { CacheException } from './exceptions/cache.exception';
import { CacheKey } from './cache.interface';

type CacheItemProps<T, K = CacheKey> = {
  hit: boolean;
  value?: T;
  metadata?: CacheItemMetadata;
  key: K;
  error?: CacheException;
  stats: CacheItemStats;
};

export class CacheItem<T, KBase = CacheKey> implements CacheItemInterface<T, KBase> {
  public readonly hit: boolean;
  public get value(): T | null {
    return this.hit ? this._value : null;
  }
  public readonly metadata: CacheItemMetadata;
  public readonly key: KBase;
  public readonly error: CacheException | false;
  public readonly stats: CacheItemStats;

  private _value: T | null;

  constructor(props: CacheItemProps<T, KBase>) {
    const { hit, value = null, metadata = {}, error, key, stats } = props;
    this._value = value;
    this.hit = hit;
    this.metadata = metadata;
    this.error = error ?? false;
    this.key = key;
    this.stats = stats;
  }

  static createFromMiss<T, K extends CacheKey = CacheKey>(props: {
    key: K;
    expiresAt?: CacheExpiresAt;
    fetched?: boolean;
    error?: CacheException;
  }): CacheItemInterface<T, K> {
    return new CacheItem<null, K>({
      hit: false,
      key: props.key,
      metadata: {
        ...(props.expiresAt ? { expiresAt: props.expiresAt } : {}),
      },
      error: props.error,
      stats: {
        counts: {
          error: props?.error ? 1 : 0,
          fetched: props?.fetched ? 1 : 0,
          hit: 0,
          miss: 1,
          persisted: 0,
        },
      },
    });
  }

  static createFromHit<T, K extends CacheKey = CacheKey>(props: {
    key: K;
    value: T;
    fetched?: boolean;
    persisted?: boolean;
    expiresAt?: CacheExpiresAt;
  }): CacheItemInterface<T, K> {
    return new CacheItem<T, K>({
      hit: true,
      value: props.value,
      key: props.key,
      metadata: {
        ...(props.expiresAt ? { expiresAt: props.expiresAt } : {}),
      },
      stats: {
        counts: {
          hit: 1,
          persisted: props.persisted ? 1 : 0,
          miss: 0,
          error: 0,
          fetched: props.fetched ? 1 : 0,
        },
      },
    });
  }

  static createFromError<T, K extends CacheKey = CacheKey>(props: {
    key: K;
    error: CacheException;
    persisted?: boolean;
    fetched?: boolean;
  }): CacheItemInterface<T, K> {
    return new CacheItem<T, K>({
      hit: false,
      error: props.error,
      key: props.key,
      stats: {
        counts: {
          error: 1,
          miss: 0,
          persisted: props.persisted ? 1 : 0,
          fetched: props.fetched ? 1 : 0,
          hit: 0,
        },
      },
    });
  }
}
