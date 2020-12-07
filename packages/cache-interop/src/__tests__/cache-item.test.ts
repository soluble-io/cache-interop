import { CacheItem } from '../cache-item';

describe('CacheItem.constructor', () => {
  it('should return allow access through getters', () => {
    const item = new CacheItem({
      value: 'val',
      key: 'k',
      hit: false,
      stats: {
        counts: {
          fetched: 1,
          hit: 1,
          persisted: 1,
          miss: 1,
          error: 0,
        },
      },
    });
    expect(item).toMatchObject({
      key: 'k',
      hit: false,
      value: 'val',
    });
  });
});

describe('CacheItem.createFromMiss', () => {
  it('should return a hit false', () => {
    const item = CacheItem.createFromMiss({
      key: 'k',
      value: 'pilou',
    });
    expect(item).toMatchObject({
      key: 'k',
      value: 'pilou',
      hit: false,
    });
  });
});
