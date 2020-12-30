import { ConnectionInterface } from './connection.interface';

export class NullConnection implements ConnectionInterface<null> {
  getNativeConnection(): null {
    return null;
  }
  quit(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
