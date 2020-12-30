import { CacheException } from './exceptions/cache.exception';
import { CacheKey } from './cache.interface';

export type CacheExpiresAt = number;

export type CacheItemMetadata<K extends CacheKey = CacheKey> = {
  key: K;
};

export interface CacheItemInterface<T, KBase extends CacheKey = CacheKey> {
  readonly isSuccess: boolean;
  readonly data: T | null;
  readonly error: CacheException | null;
  readonly metadata: CacheItemMetadata<KBase>;
  readonly isHit: boolean;
  readonly isPersisted: boolean | null;
}
