import type { CacheExceptionProps } from './cache.exception';
import { CacheException } from './cache.exception';

type Props = CacheExceptionProps;

export class UnsupportedValueException extends CacheException {
  constructor(props: Props) {
    super(props);
    Object.setPrototypeOf(this, UnsupportedValueException.prototype);
    this.name = UnsupportedValueException.prototype.constructor.name;
  }
}
