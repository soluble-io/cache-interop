import { AsyncFn, SyncFn } from './value-provider';
import { CacheValueProviderFn } from '../cache.interface';

// @todo add thenable test
export function isAsyncFn<T>(fn: unknown): fn is AsyncFn<T> {
  return (
    typeof (fn as Promise<unknown>) === 'function' &&
    (fn as Record<string, unknown>)?.constructor?.name === 'AsyncFunction'
  );
}

export function isSyncFn<T>(fn: unknown): fn is SyncFn<T> {
  return typeof fn === 'function' && !isAsyncFn(fn);
}

export function isCacheValueProviderFn<T>(fn: unknown): fn is CacheValueProviderFn<T> {
  return isAsyncFn(fn) || isSyncFn(fn);
}

export function isNonEmptyString(value: unknown, trim = true): value is string {
  return typeof value === 'string' && (trim ? value.trim() : value).length > 0;
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
