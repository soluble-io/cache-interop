export type CacheExceptionProps = {
  message?: string;
  previous?: Error | null;
};

export class CacheException extends Error {
  public readonly props: CacheExceptionProps;
  public readonly stackTrace: string | null;
  private _previous!: Error | null;

  get previous(): Error | null {
    return this._previous ?? null;
  }

  set previous(previous: Error | null) {
    this._previous = previous;
    if (previous !== null) {
      this.message = `${this.message}, innerException: ${
        previous.message.length > 0 ? previous.message : previous.name
      }`.trim();
    }
  }

  constructor(props: CacheExceptionProps) {
    const { message, previous = null } = props;
    super(message);
    this.props = props;
    Object.setPrototypeOf(this, CacheException.prototype);
    this.name = CacheException.prototype.constructor.name;
    this.stackTrace = previous?.stack ?? null;
    this.previous = previous ?? null;
  }

  getName(): string {
    return this.name;
  }

  toString(): string {
    return `${this.name}: ${this.message.trim()}`;
  }
}
