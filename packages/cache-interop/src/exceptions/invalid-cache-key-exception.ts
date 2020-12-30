import { CacheExceptionProps } from './cache.exception';
import { InvalidArgumentException } from './invalid-argument.exception';

type Props = CacheExceptionProps & {
  key: unknown;
};

export class InvalidCacheKeyException extends InvalidArgumentException {
  static readonly defaultMessage = 'InvalidArgument for cacheKey';
  private safeKey: string;
  constructor(props: Props) {
    const { key, message, previousError } = props;
    let safeKey: string;
    try {
      safeKey = JSON.stringify(key);
    } catch (e) {
      safeKey = 'unknown';
    }
    const msg = message ? message : `${InvalidCacheKeyException.defaultMessage} (${safeKey})`;
    super({ message: msg, previousError });
    this.safeKey = safeKey;
    Object.setPrototypeOf(this, InvalidCacheKeyException.prototype);
    this.name = InvalidCacheKeyException.prototype.constructor.name;
  }

  /**
   * Return the received cacheKey in Json format to prevent
   * errors when displaying in error messages.
   */
  getSafeKey(): string {
    return this.safeKey;
  }
}
