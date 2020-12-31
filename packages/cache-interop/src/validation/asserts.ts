import { CacheKey } from '../cache.interface';
import { Guards } from './guards';
import { InvalidCacheKeyException } from '../exceptions';

export class Asserts {
  static assertValidCacheKey<K extends CacheKey = CacheKey>(key: unknown, msg?: string): asserts key is K {
    if (!Guards.isValidCacheKey(key)) {
      throw new InvalidCacheKeyException({ key: true });
    }
  }
}
