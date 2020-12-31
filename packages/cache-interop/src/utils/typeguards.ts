import { AsyncFn, SyncFn } from './value-provider';

export function isPromiseLike<T>(value: unknown): value is PromiseLike<T> {
  if (value instanceof Promise) {
    return true;
  }
  if (
    value !== null &&
    (typeof value === 'function' || typeof value === 'object') &&
    typeof (value as Promise<unknown>).then === 'function'
  ) {
    return true;
  }
  return false;
}

export function isAsyncFn<T>(fn: unknown): fn is AsyncFn<T> {
  return (
    typeof (fn as Promise<unknown>) === 'function' &&
    (fn as Record<string, unknown>)?.constructor?.name === 'AsyncFunction'
  );
}

export function isSyncFn<T>(fn: unknown): fn is SyncFn<T> {
  return typeof fn === 'function' && !isAsyncFn(fn);
}

export function isSafeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value);
}

export function isParsableNumeric(value: unknown): value is number {
  if (Number.isNaN(value)) {
    return false;
  }
  if (typeof value === 'number') {
    return true;
  }
  return typeof value === 'string' && /^[0-9]+$/.test(value);
}
