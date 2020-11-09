import { CacheException, CacheInterface, IoRedisCacheAdapter, MapCacheAdapter } from '@soluble/cache-interop';
import { GenericContainer } from 'testcontainers';
import { StartedTestContainer } from 'testcontainers/dist/test-container';

const adapters = [
  ['MapCacheAdapter', () => new MapCacheAdapter()],
  //['MapCacheAdapter', () => new MapCacheAdapter()],
  [
    'IoRedisCacheAdapter',
    (options) => {
      return IoRedisCacheAdapter.createFromDSN(options!.dsn);
    },
  ],
] as [name: string, factory: (options?: Record<string, any>) => CacheInterface][];

describe.each(adapters)('Adapter: %s', (name, adapterFactory) => {
  let container: StartedTestContainer;
  let cache: CacheInterface;

  beforeAll(async () => {
    switch (name) {
      case 'IoRedisCacheAdapter':
        console.log('Starting redis container....');
        container = await new GenericContainer('redis').withExposedPorts(6379).start();
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
  describe('Adapter.set()', () => {
    describe('when value is a string', () => {
      it('should return true', async () => {
        expect(await cache.set('k', 'cool')).toStrictEqual(true);
      });
    });
    describe('when value is null', () => {
      it('should return true', async () => {
        expect(await cache.set('k', null)).toStrictEqual(true);
      });
    });
    describe('when value is a regular function', () => {
      it('should call the function and return true', async () => {
        const fct = jest.fn((_) => 'cool');
        expect(await cache.set('k', fct)).toStrictEqual(true);
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
