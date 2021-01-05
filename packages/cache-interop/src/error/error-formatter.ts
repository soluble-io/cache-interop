import { CacheInterface } from '../cache.interface';
import { ErrorReasons, errorReasons } from './error.constants';
import { Guards } from '../validation/guards';
type Method = keyof CacheInterface;
type MethodWithKey = [method: Method, key: string];

export class ErrorFormatter {
  constructor(public readonly adapterName: string, private readonly limitDetail = 40) {}
  getMsg = (method: Method | MethodWithKey, reason: ErrorReasons, detail?: string | null, msg?: string): string => {
    const message = msg || errorReasons[reason];
    const extra = Guards.isNonEmptyString(detail) ? `(${this.truncate(detail)})` : '';
    const [m, k = ''] = typeof method === 'string' ? [method] : method;
    return `[${this.adapterName}.${m}(${k})] ${reason}: ${message} ${extra}`.trim();
  };
  private truncate(detail: string) {
    if (detail.length > this.limitDetail) {
      return detail.substring(0, this.limitDetail) + '...';
    }
    return detail;
  }
}
