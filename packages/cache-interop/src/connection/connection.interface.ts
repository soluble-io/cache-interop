export interface ConnectionInterface<T> {
  quit(): Promise<boolean>;

  /**
   * Get the underlying connection
   * Accessing the underlying connection is not guaranteed by
   * api stability.
   */
  getNativeConnection(): T;
}
