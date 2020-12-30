import { InvalidCacheKeyException } from '../invalid-cache-key-exception';

describe('InvalidCacheKeyException', () => {
  it('should return a json encoded key', () => {
    const err = new InvalidCacheKeyException({ key: { errorKey: true } });
    expect(err.getSafeKey()).toStrictEqual('{"errorKey":true}');
  });
  it('should set the default message with safeKey', () => {
    const err = new InvalidCacheKeyException({ key: true });
    expect(err.message).toStrictEqual('InvalidArgument for cacheKey (true)');
  });
  it('should work with undefined keys', () => {
    const err = new InvalidCacheKeyException({ key: undefined });
    expect(err.message).toStrictEqual('InvalidArgument for cacheKey (undefined)');
  });
  it('should use the message provided if any', () => {
    const err = new InvalidCacheKeyException({ key: true, message: 'cool' });
    expect(err.message).toStrictEqual('cool');
  });
});
