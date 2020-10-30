export type CacheExceptionProps = {
  message?: string;
  previousError?: Error | null;
};

export class CacheException extends Error {
  public readonly props: CacheExceptionProps;
  public readonly stackTrace: string | null;
  private _previousError!: Error | null;

  set previousError(previousError: Error | null) {
    this._previousError = previousError;
    if (previousError !== null) {
      this.message = `${this.message}, innerException: ${
        previousError.message.length > 0 ? previousError.message : previousError.name
      }`.trim();
    }
  }

  constructor(props: CacheExceptionProps) {
    const { message, previousError = null } = props;
    super(message);
    this.props = props;
    Object.setPrototypeOf(this, CacheException.prototype);
    this.name = CacheException.prototype.constructor.name;
    this.stackTrace = previousError?.stack ?? null;
    this.previousError = previousError ?? null;
  }

  getName(): string {
    return this.name;
  }

  toString(): string {
    return `${this.name}: ${this.message.trim()}`;
  }
}
