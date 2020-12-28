import { isNonEmptyString, isValidNetworkPort } from '../dsn-parser.util';

describe('isValidNetworkPort', () => {
  it('should work as expected', () => {
    expect(isValidNetworkPort(3001)).toBeTruthy();
    expect(isValidNetworkPort(0)).toBeFalsy();
    expect(isValidNetworkPort(65536)).toBeFalsy();
    expect(isValidNetworkPort(-1)).toBeFalsy();
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
