import { CacheException, CacheExceptionProps } from './cache.exception';

type Props = CacheExceptionProps;

export class InvalidArgumentException extends CacheException {
  constructor(props: Props) {
    super(props);
    Object.setPrototypeOf(this, InvalidArgumentException.prototype);
    this.name = InvalidArgumentException.prototype.constructor.name;
  }
}
