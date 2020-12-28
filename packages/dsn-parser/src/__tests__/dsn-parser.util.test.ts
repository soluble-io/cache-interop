import { isNonEmptyString, isValidHttpPort } from '../dsn-parser.util';

describe('isValidHttpPort', () => {
  it('should work as expected', () => {
    expect(isValidHttpPort(3001)).toBeTruthy();
    expect(isValidHttpPort(0)).toBeFalsy();
    expect(isValidHttpPort(65536)).toBeFalsy();
    expect(isValidHttpPort(-1)).toBeFalsy();
  });
});

describe('isNonEmptyString', () => {
  it('should work as expected in when trim === true', () => {
    expect(isNonEmptyString('cool')).toBeTruthy();
    expect(isNonEmptyString(1)).toBeFalsy();
    expect(isNonEmptyString('  ')).toBeFalsy();
    expect(isNonEmptyString('')).toBeFalsy();
    expect(isNonEmptyString(null)).toBeFalsy();
    expect(isNonEmptyString({})).toBeFalsy();
  });
  it('should work as expected in when trim === false', () => {
    expect(isNonEmptyString('cool ', false)).toBeTruthy();
    expect(isNonEmptyString('  ', false)).toBeTruthy();
  });
});
