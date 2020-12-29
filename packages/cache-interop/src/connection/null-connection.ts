import { ConnectionInterface } from './connection.interface';

export class NullConnection implements ConnectionInterface<null> {
  getWrappedConnection(): null {
    return null;
  }
  quit(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
