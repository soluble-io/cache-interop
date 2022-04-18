import type { CacheItemPropsErr, CacheItemPropsOk } from './cache-item';
import { CacheItem } from './cache-item';
import type { CacheKey } from './cache.interface';
import { InvalidCacheKeyException } from './exceptions';

export class CacheItemFactory {
  static fromCacheMiss<T, K extends CacheKey = CacheKey>(
    props: Omit<CacheItemPropsOk<T | null, K>, 'success' | 'isHit' | 'data'> & {
      defaultValue: T | null;
      data?: never;
    }
  ): CacheItem<T | null, K> {
    return new CacheItem<T | null, K>({
      ...props,
      ...{ data: props.defaultValue, success: true, isHit: false },
    });
  }
  static fromOk<T, K extends CacheKey = CacheKey>(
    props: Omit<CacheItemPropsOk<T, K>, 'success'>
  ): CacheItem<T, K> {
    return new CacheItem<T, K>({ ...props, ...{ success: true } });
  }
  static fromErr<K extends CacheKey = CacheKey>(
    props: Omit<CacheItemPropsErr<K>, 'success'>
  ): CacheItem<null, K> {
    return new CacheItem<null, K>({ ...props, ...{ success: false } });
  }
  static fromInvalidCacheKey<K extends CacheKey = CacheKey>(
    key: unknown
  ): CacheItem<null, string> {
    const err = new InvalidCacheKeyException({ key });
    return new CacheItem<null, string>({
      success: false,
      key: err.message,
      error: err,
    });
  }
}
