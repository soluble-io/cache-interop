import type { CacheInterface } from '@soluble/cache-interop';
import { Guards } from '@soluble/cache-interop';

import { getTestAdapters } from '../setup/getTestAdapters';

const adapters = getTestAdapters();

describe.each(adapters)('Adapter: %s', (name, adapterFactory) => {
  let cache: CacheInterface;
  beforeAll(async () => {
    cache = await adapterFactory();
  });
  afterAll(async () => {
    if (Guards.isConnectedCache(cache)) {
      await cache.getConnection().quit();
    }
  });
  afterEach(async () => {
    await cache.clear();
  });

  describe('Adapter.getMultiple()', () => {
    describe('when some cache entries exists', () => {
      it('should only return existing keys', async () => {
        await cache.set('key1', 'val1');
        await cache.setMultiple([['key2', 'val2']]);
        const resp = await cache.getMultiple([
          'key1',
          'key2',
          'key-not-exists',
        ]);
        expect(resp.size).toBe(3);
        expect(resp.get('key1')?.data).toStrictEqual('val1');
        expect(resp.get('key2')?.data).toStrictEqual('val2');
        expect(resp.get('key-not-exists')?.data).toBeNull();
      });
    });
    describe('when some entries exists and defaultValue is provided', () => {
      it('should return existing keys and set the defaults to others', async () => {
        await cache.set('key1', 'val1');
        await cache.setMultiple([['key2', 'val2']]);
        const resp = await cache.getMultiple(
          ['key1', 'key2', 'key-not-exists'],
          {
            defaultValue: 'the_default_value',
          }
        );
        expect(resp.size).toBe(3);
        expect(resp.get('key1')?.data).toStrictEqual('val1');
        expect(resp.get('key2')?.data).toStrictEqual('val2');
        expect(resp.get('key-not-exists')?.data).toStrictEqual(
          'the_default_value'
        );
      });
    });
    describe('when disableCache is set to true', () => {
      it('should return null but respect defaultValue', async () => {
        await cache.set('key1', 'val1');
        await cache.setMultiple([['key2', 'val2']]);
        const resp = await cache.getMultiple(
          ['key1', 'key2', 'key-not-exists'],
          {
            defaultValue: 'the_default_value',
            disableCache: true,
          }
        );
        expect(resp.size).toBe(3);
        expect(resp.get('key1')?.data).toStrictEqual('the_default_value');
        expect(resp.get('key2')?.data).toStrictEqual('the_default_value');
        expect(resp.get('key-not-exists')?.data).toStrictEqual(
          'the_default_value'
        );
      });
    });
  });
});
