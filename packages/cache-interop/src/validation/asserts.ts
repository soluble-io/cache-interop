import type { CacheKey } from '../cache.interface';
import { InvalidCacheKeyException } from '../exceptions';
import { Guards } from './guards';

export class Asserts {
  static assertValidCacheKey<K extends CacheKey = CacheKey>(
    key: unknown,
    msg?: string
  ): asserts key is K {
    if (!Guards.isValidCacheKey(key)) {
      throw new InvalidCacheKeyException({ key: true });
    }
  }
}
