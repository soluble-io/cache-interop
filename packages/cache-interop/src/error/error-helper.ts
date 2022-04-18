import {
  CacheException,
  InvalidCacheKeyException,
  UnexpectedErrorException,
  UnsupportedValueException,
  CacheProviderException,
} from '../exceptions';
import type { CallerMethod, MethodWithKey } from './error-formatter';
import { ErrorFormatter } from './error-formatter';
import type { ErrorReasons } from './error.constants';

export class ErrorHelper {
  private readonly formatter: ErrorFormatter;
  constructor(private readonly adapterName: string) {
    this.formatter = new ErrorFormatter(this.adapterName);
  }

  formatMsg(
    method: CallerMethod,
    reason: ErrorReasons,
    detail?: string | null
  ): string {
    return this.formatter.getMsg(method, reason, detail);
  }

  getInvalidCacheKeyException([
    method,
    key,
  ]: MethodWithKey): InvalidCacheKeyException {
    return new InvalidCacheKeyException({
      key,
      message: this.formatMsg(method, 'INVALID_KEY'),
    });
  }

  getCacheProviderException(
    method: CallerMethod,
    previous?: Error
  ): CacheProviderException {
    return new CacheProviderException({
      message: this.formatMsg(
        method,
        'VALUE_PROVIDER_ERROR',
        previous?.message
      ),
      previous: previous,
    });
  }

  getUnsupportedValueException(
    method: CallerMethod,
    v: unknown
  ): UnsupportedValueException {
    let json: string;
    try {
      json = JSON.stringify(v);
    } catch (e) {
      json = '<unparsable>';
    }
    return new UnsupportedValueException({
      message: this.formatMsg(
        method,
        'UNSUPPORTED_VALUE',
        `type: ${typeof v}, val: ${json}`
      ),
    });
  }

  getUnexpectedErrorException(
    method: CallerMethod,
    previous?: Error
  ): UnexpectedErrorException {
    return new UnexpectedErrorException({
      message: this.formatMsg(method, 'UNEXPECTED_ERROR', previous?.message),
    });
  }

  getCacheException(
    method: CallerMethod,
    reason: ErrorReasons,
    previous?: Error
  ): CacheException {
    return new CacheException({
      message: this.formatMsg(method, reason, previous?.message),
      previous: previous,
    });
  }
}
