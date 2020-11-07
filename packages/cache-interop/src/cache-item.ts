import { CacheExpiresAt, CacheItemInterface, CacheItemMetadata, CacheItemStats } from './cache-item.interface';
import { CacheException } from './exceptions/cache.exception';
import { CacheKey } from './cache.interface';

type CacheItemProps<T> = {
  hit: boolean;
  value?: T;
  metadata?: CacheItemMetadata;
  key: CacheKey;
  error?: CacheException;
  stats: CacheItemStats;
};

export class CacheItem<T> implements CacheItemInterface<T> {
  public readonly hit: boolean;
  public get data(): T | null {
    return this.hit ? this._value : null;
  }
  public readonly metadata: CacheItemMetadata;
  public readonly key: CacheKey;
  public readonly error: CacheException | false;
  public readonly stats: CacheItemStats;

  private _value: T | null;

  constructor(props: CacheItemProps<T>) {
    const { hit, value = null, metadata = {}, error, key, stats } = props;
    this._value = value;
    this.hit = hit;
    this.metadata = metadata;
    this.error = error ?? false;
    this.key = key;
    this.stats = stats;
  }

  static createFromMiss<T>(props: {
    key: string;
    expiresAt?: CacheExpiresAt;
    fetched?: boolean;
    error?: CacheException;
  }): CacheItemInterface<T> {
    return new CacheItem<null>({
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

  static createFromHit<T>(props: {
    key: string;
    value: T;
    fetched?: boolean;
    persisted?: boolean;
    expiresAt?: CacheExpiresAt;
  }): CacheItemInterface<T> {
    return new CacheItem<T>({
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

  static createFromError<T>(props: {
    key: string;
    error: CacheException;
    persisted?: boolean;
    fetched?: boolean;
  }): CacheItemInterface<T> {
    return new CacheItem<null>({
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
