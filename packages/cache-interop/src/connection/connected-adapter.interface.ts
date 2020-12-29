import { ConnectionInterface } from './connection.interface';

export interface ConnectedAdapterInterface<T> {
  getConnection(): ConnectionInterface<T>;
}
