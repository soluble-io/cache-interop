import { EvictionPolicyInterface } from './eviction-policy.interface';
import { EsDateProvider, UnixTime } from '../expiry/es-date-provider';
import { DateProvider } from '../expiry/date-provider.interface';
import { CacheKey } from '../cache.interface';

export class ExpiresAtPolicy implements EvictionPolicyInterface {
  private dateProvider: DateProvider;
  constructor(options?: { dateProvider?: DateProvider }) {
    const { dateProvider = new EsDateProvider() } = options ?? {};
    this.dateProvider = dateProvider;
  }

  isExpired<T>(expiresAt: UnixTime, data?: T, key?: CacheKey): boolean {
    if (expiresAt === 0) {
      return false;
    }
    const now = this.dateProvider.getUnixTime();
    return expiresAt <= now;
  }
}
