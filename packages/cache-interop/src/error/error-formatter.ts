import { CacheInterface } from '../cache.interface';
import { ErrorReasons, errorReasons } from './error.constants';
import { Guards } from '../validation/guards';
type Method = keyof CacheInterface;

export class ErrorFormatter {
  constructor(public readonly adapterName: string) {}
  getMsg = (method: Method, reason: ErrorReasons, detail?: string | null, msg?: string): string => {
    const message = msg || errorReasons[reason];
    const extra = Guards.isNonEmptyString(detail) ? `(${detail})` : '';
    return `[${this.adapterName}.${method}()] ${reason}: ${message} ${extra}`.trim();
  };
}
