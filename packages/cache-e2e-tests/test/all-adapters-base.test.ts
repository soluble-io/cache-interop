import { CacheException, CacheInterface, MapCacheAdapter } from '@soluble/cache-interop';
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
  describe('Adapter.set()', () => {
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
    describe('when value from a function returning a string', () => {
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
    describe('when value from a function returning null', () => {
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
      it('should return a CacheException when function throws', async () => {
        const fct = jest.fn((_) => {
          throw new Error('error');
        });
        const ret = await cache.set('k', fct);
        expect(ret).toBeInstanceOf(CacheException);
        expect(fct).toHaveBeenCalledTimes(1);
      });
    });
    describe('when value is a native async function', () => {
      it('should call the function with params and return true', async () => {
        const fct = jest.fn(async (_) => 'native');
        expect(await cache.set('k', fct)).toStrictEqual(true);
        expect(fct).toHaveBeenCalledTimes(1);
      });
      it('should return a CacheException when promise fails', async () => {
        const fct = jest.fn(async (_) => {
          throw new Error('fetch-error');
        });
        const ret = await cache.set('k', fct);
        expect(ret).toBeInstanceOf(CacheException);
        expect(fct).toHaveBeenCalledTimes(1);
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
