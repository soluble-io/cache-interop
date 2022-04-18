import type { UnixTime } from '../expiry/es-date-provider';

export interface EvictionPolicyInterface {
  /**
   * @throws InvalidArgumentException
   */
  isExpired(expiresAt: UnixTime): boolean;
}
