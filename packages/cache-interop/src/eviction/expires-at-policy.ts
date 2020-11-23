import { EvictionPolicyInterface } from './eviction-policy.interface';
import { EsDateProvider, UnixTime } from '../expiry/es-date-provider';
import { DateProvider } from '../expiry/date-provider.interface';
import { isSafeInteger } from '../utils';
import { InvalidArgumentException } from '../exceptions';

export class ExpiresAtPolicy implements EvictionPolicyInterface {
  private dateProvider: DateProvider;
  constructor(options?: { dateProvider?: DateProvider }) {
    const { dateProvider = new EsDateProvider() } = options ?? {};
    this.dateProvider = dateProvider;
  }

  /**
   * Checks whether a expiration unix time is still valid
   *
   * @param expiresAt - UnixTime expressed in seconds
   * @throws InvalidArgumentException
   */
  isExpired<T>(expiresAt: UnixTime): boolean {
    if (!isSafeInteger(expiresAt)) {
      throw new InvalidArgumentException({
        message: 'ExpiresAtPolicy expects parameter expiresAt to be a safeInteger',
      });
    }
    if (expiresAt === 0) {
      return false;
    }
    const now = this.dateProvider.getUnixTime();
    return expiresAt <= now;
  }
}
