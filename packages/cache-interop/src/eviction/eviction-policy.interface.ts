import { UnixTime } from '../expiry/es-date-provider';
import { CacheKey } from '../cache.interface';

export interface EvictionPolicyInterface {
  isExpired<T>(expiresAt: UnixTime, data?: T, key?: CacheKey): boolean;
}
