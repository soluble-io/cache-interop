import type { ConnectionInterface } from './connection.interface';

export interface ConnectedCacheInterface<T> {
  getConnection(): ConnectionInterface<T>;
}
