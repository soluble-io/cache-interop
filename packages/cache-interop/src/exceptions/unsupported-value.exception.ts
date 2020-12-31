import { CacheException, CacheExceptionProps } from './cache.exception';

type Props = CacheExceptionProps;

export class UnsupportedValueException extends CacheException {
  constructor(props: Props) {
    super(props);
    Object.setPrototypeOf(this, UnsupportedValueException.prototype);
    this.name = UnsupportedValueException.prototype.constructor.name;
  }
}
