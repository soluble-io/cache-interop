import { CacheException, CacheInterface, CacheProviderException, MapCacheAdapter } from '@soluble/cache-interop';
import { IoRedisCacheAdapter } from '@soluble/cache-ioredis';
import { GenericContainer } from 'testcontainers';
import { StartedTestContainer } from 'testcontainers/dist/test-container';

const adapters = [
  ['MapCacheAdapter', '', () => new MapCacheAdapter()],
  [
    'IoRedisCacheAdapter',
    'redis:5-alpine',
    (options) => {
      return IoRedisCacheAdapter.createFromDSN(options!.dsn);
    },
  ],
  [
    'IoRedisCacheAdapter',
    'redis:6-alpine',
    (options) => {
      return IoRedisCacheAdapter.createFromDSN(options!.dsn);
    },
  ],
] as [name: string, image: string, factory: (options?: Record<string, any>) => CacheInterface][];

describe.each(adapters)('Adapter: %s %s', (name, image, adapterFactory) => {
  let container: StartedTestContainer;
  let cache: CacheInterface;

  beforeAll(async () => {
    switch (name) {
      case 'IoRedisCacheAdapter':
        console.log('Starting redis container....');
        const [imageName, imageTag] = (image ?? '').split(':');
        container = await new GenericContainer(imageName, imageTag).withExposedPorts(6379).start();
        const options = {
          dsn: `redis://${container.getHost()}:${container.getMappedPort(6379)}`,
        };
        cache = adapterFactory(options);
        break;
      default:
        cache = adapterFactory();
    }
  });
  afterAll(async () => {
    switch (name) {
      case 'IoRedisCacheAdapter':
        console.log('Stopping redis container...');
        await (cache as IoRedisCacheAdapter).getStorage().quit();
        await container.stop();
        break;
      default:
    }
  });

  afterEach(() => {
    cache.clear();
  });
  /**
   * ##############################################################
   * # Adapter::set() basic behaviour                             #
   * ##############################################################
   */
  describe('Adapter.set() basics', () => {
    describe('when setting a string value', () => {
      it('should return true', async () => {
        expect(await cache.set('k', 'cool')).toStrictEqual(true);
      });
      it('should persist the value', async () => {
        await cache.set('k2', 'cool2');
        expect((await cache.get('k2')).value).toStrictEqual('cool2');
      });
    });
    describe('when setting a null value', () => {
      it('should return true', async () => {
        expect(await cache.set('k', null)).toStrictEqual(true);
      });
      it('should persist the value', async () => {
        await cache.set('k2', null);
        expect((await cache.get('k2')).value).toBeNull();
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
        expect((await cache.get('k2')).value).toStrictEqual('cool');
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
        expect((await cache.get('k2')).value).toBeNull();
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

  /**
   * ##############################################################
   * # Adapter::get() behaviour                                   #
   * ##############################################################
   */
  describe('Adapter.get()', () => {
    describe('when value is not in cache', () => {
      it('should return empty non-error cacheitem', async () => {
        expect(await cache.get('k')).toMatchObject({
          key: 'k',
          hit: false,
          error: false,
          value: null,
        });
      });
    });
    describe('when value is in cache', () => {
      it('should return cacheitem with data', async () => {
        await cache.set('k', 'hello world');
        expect(await cache.get('k')).toMatchObject({
          key: 'k',
          hit: true,
          error: false,
          value: 'hello world',
        });
      });
    });
  });

  /**
   * ##############################################################
   * # Adapter::delete() behaviour                                   #
   * ##############################################################
   */
  describe('Adapter::delete()', () => {
    describe('when value is not in cache', () => {
      it('should return 0 count', async () => {
        expect(await cache.delete('no_existsing')).toStrictEqual(0);
      });
    });
    describe('when value is in cache', () => {
      it('should return 1 and delete the entry', async () => {
        await cache.set('k', 'cool');
        expect((await cache.get('k')).value).toStrictEqual('cool');
        expect(await cache.delete('k')).toStrictEqual(1);
        expect((await cache.get('k')).value).toStrictEqual(null);
      });
    });
  });

  /**
   * ##############################################################
   * # Adapter::has() behaviour                                   #
   * ##############################################################
   */
  describe('Adapter::has()', () => {
    describe('when value is not in cache', () => {
      it('should return false', async () => {
        expect(await cache.has('no_existsing')).toStrictEqual(false);
      });
    });
    describe('when value is in cache', () => {
      it('should return true', async () => {
        await cache.set('k', 'cool');
        expect(await cache.has('k')).toStrictEqual(true);
      });
    });
  });

  /**
   * ##############################################################
   * # Adapter::deleteMultiple() behaviour                                   #
   * ##############################################################
   */
  describe('Adapter::deleteMultiple()', () => {
    it('should return the delete count for each keys', async () => {
      await cache.set('key-exists', 'cool');
      const resp = await cache.deleteMultiple(['key-exists', 'no1', 'no2']);
      expect(resp).toStrictEqual(
        new Map([
          ['key-exists', 1],
          ['no1', 0],
          ['no2', 0],
        ])
      );
    });
  });

  /**
   * ##############################################################
   * # Adapter::setMultiple() behaviour                                   #
   * ##############################################################
   */
  describe('Adapter::setMultiple()', () => {
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
        expect(ret).toStrictEqual(
          new Map([
            ['k-string', true],
            ['k-null', true],
            ['k-fn-ok', true],
            ['k-async-ok', true],
          ])
        );
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
      });
    });
  });

  /**
   * ##############################################################
   * # Adapter::getOrSet() behaviour                                   #
   * ##############################################################
   */
  describe('Adapter::getOrSet', () => {
    describe('when value is not in cache', () => {
      it('should return and set the value', async () => {
        expect(await cache.getOrSet('k', async () => 'hello')).toMatchObject({
          key: 'k',
          hit: true,
          error: false,
          value: 'hello',
        });
      });
    });
  });
});
