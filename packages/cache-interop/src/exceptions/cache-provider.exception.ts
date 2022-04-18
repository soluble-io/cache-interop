import type { CacheExceptionProps } from './cache.exception';
import { CacheException } from './cache.exception';

type Props = CacheExceptionProps;

export class CacheProviderException extends CacheException {
  constructor(props: Props) {
    super(props);
    Object.setPrototypeOf(this, CacheProviderException.prototype);
    this.name = CacheProviderException.prototype.constructor.name;
  }
}
