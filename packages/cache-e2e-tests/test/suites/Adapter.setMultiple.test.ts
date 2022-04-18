import type { CacheInterface } from '@soluble/cache-interop';
import { CacheProviderException, Guards } from '@soluble/cache-interop';

import { getTestAdapters } from '../setup/getTestAdapters';

const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

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

  describe('Adapter.setMultiple()', () => {
    describe('when keyVals are valid', () => {
      it('should return a map with key/true', async () => {
        const fnAsyncOk = jest.fn(async (_) => 'async');
        const fnOk = jest.fn(() => 'sync');
        const ret = await cache.setMultiple([
          ['k-string', 'hello'],
          ['k-null', null],
          ['k-fn-ok', fnOk],
          ['k-async-ok', fnAsyncOk],
        ]);
        expect(ret).toStrictEqual<any>(
          new Map([
            ['k-string', true],
            ['k-null', true],
            ['k-fn-ok', true],
            ['k-async-ok', true],
          ])
        );
        expect((await cache.get('k-string')).data).toStrictEqual('hello');
        expect((await cache.get('k-null')).data).toStrictEqual(null);
        expect((await cache.get('k-fn-ok')).data).toStrictEqual('sync');
        expect((await cache.get('k-async-ok')).data).toStrictEqual('async');
      });
    });
    describe('when keyVals throws errors', () => {
      it('should return a map with key/CacheException', async () => {
        const fnAsyncErr = jest.fn(async (_) => {
          throw new Error('error');
        });
        const fnErr = jest.fn(() => {
          throw new Error('error');
        });
        const ret = await cache.setMultiple([
          ['k-string', 'hello'],
          ['k-fn-err', fnErr],
          ['k-async-err', fnAsyncErr],
        ]);
        expect(ret.get('k-string')).toStrictEqual(true);
        expect(ret.get('k-fn-err')).toBeInstanceOf(CacheProviderException);
        expect(ret.get('k-async-err')).toBeInstanceOf(CacheProviderException);
        expect((await cache.get('k-string')).data).toStrictEqual('hello');
        expect((await cache.get('k-fn-err')).data).toStrictEqual(null);
        expect((await cache.get('k-async-err')).data).toStrictEqual(null);
      });
      describe('when ttl option is given', () => {
        it('should set ttl so entries will be discarded', async () => {
          await cache.setMultiple([['k', 'hello']], {
            ttl: 1,
          });
          expect((await cache.get('k')).data).toStrictEqual('hello');
          await sleep(1001);
          expect(await cache.get('k')).toMatchObject({
            isSuccess: true,
            isHit: false,
            data: null,
          });
        });
      });
      describe('when disableCache is true', () => {
        it('should not persist entry and return false', async () => {
          const ret = await cache.setMultiple(
            [
              ['k1', 'hello'],
              ['k2', 'cool'],
            ],
            {
              disableCache: true,
            }
          );
          expect(ret.get('k1')).toStrictEqual(false);
          expect(ret.get('k2')).toStrictEqual(false);
          expect((await cache.get('k1')).data).toStrictEqual(null);
          expect((await cache.get('k2')).data).toStrictEqual(null);
        });
        it('should never execute function provider', async () => {
          const fn = jest.fn(async (_) => 'cool');
          await cache.setMultiple([['k', fn]], {
            disableCache: true,
          });
          expect(fn).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
