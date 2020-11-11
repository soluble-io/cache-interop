import { CacheException } from './exceptions/cache.exception';
import { CacheKey } from './cache.interface';

export type CacheExpiresAt = number;

export type CacheItemMetadata = {
  expiresAt?: CacheExpiresAt | null;
};

export type CacheItemStats = {
  counts: {
    /** Number of cache hit */
    hit: number;
    /** Number of cache misses */
    miss: number;
    /** Number of encountered errors */
    error: number;
    /** Number of fetches from provider function */
    fetched: number;
    /** Number of persisted item during getOrSet call */
    persisted: number;
  };
};

export interface CacheItemInterface<T, KBase = CacheKey> {
  readonly hit: boolean;
  readonly value: T | null;
  readonly metadata?: CacheItemMetadata;
  readonly key: KBase;
  readonly error: CacheException | false;
  readonly stats: CacheItemStats;
}
