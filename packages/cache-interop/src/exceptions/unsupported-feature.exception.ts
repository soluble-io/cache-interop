import { CacheException, CacheExceptionProps } from './cache.exception';

type Props = CacheExceptionProps;

export class UnsupportedFeatureException extends CacheException {
  constructor(props: Props) {
    super(props);
    Object.setPrototypeOf(this, UnsupportedFeatureException.prototype);
    this.name = UnsupportedFeatureException.prototype.constructor.name;
  }
}
