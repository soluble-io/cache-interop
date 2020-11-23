import { UnixTime } from '../expiry/es-date-provider';

export interface EvictionPolicyInterface {
  /**
   * @throws InvalidArgumentException
   */
  isExpired<T>(expiresAt: UnixTime): boolean;
}
