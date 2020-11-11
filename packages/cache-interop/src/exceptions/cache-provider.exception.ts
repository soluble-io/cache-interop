import { CacheException, CacheExceptionProps } from './cache.exception';

type Props = CacheExceptionProps;

export class CacheProviderException extends CacheException {
  constructor(props: Props) {
    super(props);
    Object.setPrototypeOf(this, CacheProviderException.prototype);
    this.name = CacheProviderException.prototype.constructor.name;
  }
}
