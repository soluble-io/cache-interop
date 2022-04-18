import {
  CacheException,
  CacheInterface,
  CacheProviderException,
  Guards,
  InvalidCacheKeyException,
} from '@soluble/cache-interop';

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

  describe('Adapter.set()', () => {
    describe('when setting a string value', () => {
      it('should return true', async () => {
        expect(await cache.set('k', 'cool')).toStrictEqual(true);
      });
      it('should persist the value', async () => {
        await cache.set('k2', 'cool2');
        expect((await cache.get('k2')).data).toStrictEqual('cool2');
      });
    });
    describe('when setting a null value', () => {
      it('should return true', async () => {
        expect(await cache.set('k', null)).toStrictEqual(true);
      });
      it('should persist the value', async () => {
        await cache.set('k2', null);
        expect((await cache.get('k2')).data).toBeNull();
      });
    });
    describe('when disableCache is true', () => {
      it('should not persist entry and return false', async () => {
        expect(
          await cache.set('k', 'cool', {
            disableCache: true,
          })
        ).toStrictEqual(false);
        expect((await cache.get('k')).data).toStrictEqual(null);
      });
      it('should not execute the function provider', async () => {
        const fct = jest.fn((_) => 'cool');
        await cache.set('k', 'cool', {
          disableCache: true,
        });
        expect(fct).toHaveBeenCalledTimes(0);
      });
    });

    describe('when value is a function returning a string', () => {
      it('should call the function and return true', async () => {
        const fct = jest.fn((_) => 'cool');
        expect(await cache.set('k', fct)).toStrictEqual(true);
        expect(fct).toHaveBeenCalledTimes(1);
      });
      it('should persist the value', async () => {
        const fct = jest.fn((_) => 'cool');
        await cache.set('k2', fct);
        expect((await cache.get('k2')).data).toStrictEqual('cool');
      });
    });
    describe('when value is a function returning null', () => {
      it('should call the function and return true', async () => {
        const fct = jest.fn((_) => 'cool');
        expect(await cache.set('k', fct)).toStrictEqual(true);
        expect(fct).toHaveBeenCalledTimes(1);
      });
      it('should persist the value', async () => {
        const fct = jest.fn((_) => null);
        await cache.set('k2', fct);
        expect((await cache.get('k2')).data).toBeNull();
      });
    });
    describe('when function throws', () => {
      it('should return a CacheProviderException when function throws', async () => {
        const fct = jest.fn((_) => {
          throw new Error('error');
        });
        const ret = await cache.set('k', fct);
        expect(fct).toHaveBeenCalledTimes(1);
        expect(ret).toBeInstanceOf(CacheProviderException);
        //expect((ret as CacheProviderException).message).toMatch('[]');
      });
    });

    describe('when value is a native async function', () => {
      it('should call the function with params and return true', async () => {
        const fct = jest.fn(async (_) => 'native');
        expect(await cache.set('k', fct)).toStrictEqual(true);
        expect(fct).toHaveBeenCalledTimes(1);
      });
    });

    describe('when value is an async function that throws', () => {
      it('should return a CacheProviderException when promise fails', async () => {
        const fct = jest.fn(async (_) => {
          throw new Error('fetch-error');
        });
        const ret = await cache.set('k', fct);
        expect(fct).toHaveBeenCalledTimes(1);
        expect(ret).toBeInstanceOf(CacheException);
      });
    });
  });
});
