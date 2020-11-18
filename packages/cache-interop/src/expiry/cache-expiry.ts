import { DateProvider } from './date-provider.interface';
import { EsDateProvider, UnixTime } from './es-date-provider';

export class CacheExpiry {
  private dateProvider: DateProvider;
  constructor(options?: { dateProvider?: DateProvider }) {
    const { dateProvider = new EsDateProvider() } = options ?? {};
    this.dateProvider = dateProvider;
  }

  /**
   * Get cache expiry as current epoch time in seconds + ttl, returns null if ttl is zero
   *
   * @param ttl number in seconds
   */
  getExpiresAt(ttl: number): UnixTime | null {
    if (ttl === 0) {
      return null;
    }
    return this.dateProvider.getUnixTime() + ttl;
  }
}
