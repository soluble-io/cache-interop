import { assertParsableDsn } from '../parsable-dsn.assert';

describe('assertParsableDsn', () => {
  it('should pass valid dsn', () => {
    expect(assertParsableDsn('redis://localhost')).toStrictEqual(undefined);
  });
  it("should throw when dsn can't be parsed", () => {
    expect(() => assertParsableDsn('redis:/')).toThrow('Cannot parse DSN (PARSE_ERROR)');
  });
  it('should throw custom message', () => {
    expect(() => assertParsableDsn('redis:/', 'message')).toThrow('message');
  });
});
