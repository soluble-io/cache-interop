import { isAsyncFn, isSyncFn } from './typeguards';
import { InvalidArgumentException } from '../exceptions';

export type AsyncFn<T> = () => Promise<T>;
export type SyncFn<T> = () => T;

export async function executeValueProviderFn<T>(syncOrAsyncFn: AsyncFn<T> | SyncFn<T> | Promise<T>): Promise<T> {
  if (isAsyncFn(syncOrAsyncFn)) {
    return syncOrAsyncFn();
  } else if (isSyncFn(syncOrAsyncFn)) {
    return Promise.resolve(syncOrAsyncFn());
  }
  throw new InvalidArgumentException({ message: 'Function provided is not correct' });
}
