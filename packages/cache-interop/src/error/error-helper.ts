import { ErrorFormatter } from './error-formatter';
import { CacheInterface } from '../cache.interface';
import { ErrorReasons } from './error.constants';
import {
  CacheException,
  InvalidCacheKeyException,
  UnexpectedErrorException,
  UnsupportedValueException,
} from '../exceptions';

export class ErrorHelper {
  private readonly formatter: ErrorFormatter;
  constructor(private readonly adapterName: string) {
    this.formatter = new ErrorFormatter(this.adapterName);
  }

  formatMsg(method: keyof CacheInterface, reason: ErrorReasons, detail?: string | null): string {
    return this.formatter.getMsg(method, reason, detail);
  }

  getInvalidCacheKeyException(method: keyof CacheInterface, key: unknown): InvalidCacheKeyException {
    return new InvalidCacheKeyException({ key: key, message: this.formatMsg(method, 'INVALID_KEY') });
  }

  getCacheProviderException(method: keyof CacheInterface, previous?: Error): CacheException {
    return new CacheException({
      message: this.formatMsg(method, 'EXECUTE_ASYNC_ERROR', previous?.message),
      previousError: previous,
    });
  }

  getUnsupportedValueException(method: keyof CacheInterface, v: unknown): UnsupportedValueException {
    let json: string;
    try {
      json = JSON.stringify(v);
    } catch (e) {
      json = '<unparsable>';
    }
    return new UnsupportedValueException({
      message: this.formatMsg(method, 'UNSUPPORTED_VALUE', `type: ${typeof v}, val: ${json}`),
    });
  }

  getUnexpectedErrorException(method: keyof CacheInterface, previous?: Error): UnexpectedErrorException {
    return new UnexpectedErrorException({
      message: this.formatMsg(method, 'UNEXPECTED_ERROR', previous?.message),
    });
  }

  getCacheException(method: keyof CacheInterface, reason: ErrorReasons, previous?: Error): CacheException {
    return new CacheException({ message: this.formatMsg(method, reason, previous?.message), previousError: previous });
  }
}
