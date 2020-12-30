import { CacheKey } from '../cache.interface';
import { isNonEmptyString } from '../utils';

export class Guards {
  static isValidCacheKey<K extends CacheKey = CacheKey>(key: unknown): key is K {
    return isNonEmptyString(key);
  }
}
