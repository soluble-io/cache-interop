import type { CacheExceptionProps } from './cache.exception';
import { CacheException } from './cache.exception';

type Props = CacheExceptionProps;

export class UnexpectedErrorException extends CacheException {
  constructor(props: Props) {
    super(props);
    Object.setPrototypeOf(this, UnexpectedErrorException.prototype);
    this.name = UnexpectedErrorException.prototype.constructor.name;
  }
}
