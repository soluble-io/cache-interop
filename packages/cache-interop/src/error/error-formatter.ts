import { CacheInterface } from '../cache.interface';
import { ErrorReasons, errorReasons } from './error.constants';
import { Guards } from '../validation/guards';

export type Method = keyof CacheInterface;
export type MethodWithKey = [method: Method, key: string];

export type CallerMethod = Method | MethodWithKey;

export class ErrorFormatter {
  constructor(public readonly adapterName: string, private readonly limitDetail = 40) {}
  getMsg = (method: CallerMethod, reason: ErrorReasons, detail?: string | null, msg?: string): string => {
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
