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

  describe('Adapter.deleteMultiple()', () => {
    it('should return a Map with key and boolean', async () => {
      await cache.set('key-exists', 'cool');
      const resp = await cache.deleteMultiple(['key-exists', 'no1']);
      expect(resp).toStrictEqual<any>(
        new Map([
          ['key-exists', true],
          ['no1', false],
        ])
      );
    });
    describe('when disableCache is set to true', () => {
      it('should return a Map with key and false', async () => {
        await cache.set('key-exists', 'cool');
        const resp = await cache.deleteMultiple(['key-exists', 'no1'], {
          disableCache: true,
        });
        expect(resp).toStrictEqual<any>(
          new Map([
            ['key-exists', false],
            ['no1', false],
          ])
        );
      });
    });
  });
});
