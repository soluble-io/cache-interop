import type {
  CacheInterface,
  ConnectedCacheInterface,
} from '@soluble/cache-interop';
import { CacheException, ErrorFormatter } from '@soluble/cache-interop';
import { IoRedisCacheAdapter } from '@soluble/cache-ioredis';
import { RedisCacheAdapter } from '@soluble/cache-redis';
import IORedis from 'ioredis';
import { createClient } from 'redis';

type ConnectableCache = CacheInterface & ConnectedCacheInterface<unknown>;

const unconnectedAdapters = [
  [
    'IoRedisCacheAdapter',
    async (port: number) => {
      return new IoRedisCacheAdapter({
        connection: new IORedis({
          host: 'localhost',
          port,
          maxRetriesPerRequest: 0,
        }),
      });
    },
  ],
  [
    'RedisCacheAdapter',
    async (port: number) => {
      return new RedisCacheAdapter({
        connection: createClient({
          host: 'localhost',
          port: port,
          max_attempts: 1,
          /** Will make the client fails early */
          enable_offline_queue: false,
          connect_timeout: 10,
          disable_resubscribing: true,
          no_ready_check: true,
        }),
      });
    },
  ],
] as [name: string, factory: (port: number) => Promise<ConnectableCache>][];

const invalidPortForTests = 65440;

describe.each(unconnectedAdapters)('Adapter: %s', (name, adapterFactory) => {
  let cache: ConnectableCache;
  beforeAll(async () => {
    try {
      cache = await adapterFactory(invalidPortForTests);
    } catch (e) {
      console.debug('Adapter is expected to fail to connect', cache);
    }
  });
  afterAll(async () => {
    try {
      await cache.getConnection().quit();
    } catch (e) {
      console.debug('Expected failure closing adapter connection');
    }
  });

  describe('When connection fails', () => {
    const errFmt = new ErrorFormatter(name);
    describe('Adapter.get()', () => {
      it('should return error with proper message', async () => {
        const { error } = await cache.get('k');
        expect(error).toBeInstanceOf(CacheException);
        const expected = errFmt.getMsg(['get', 'k'], 'READ_ERROR');
        expect(error?.message).toMatch(expected);
      });
    });
    describe('Adapter.getMultiple()', () => {
      it('should return error with proper message', async () => {
        const item = (await cache.getMultiple(['k'])).get('k');
        expect(item).not.toBeUndefined();
        const { error } = item as any;
        expect(error).toBeInstanceOf(CacheException);
        const expected = errFmt.getMsg(['get', 'k'], 'READ_ERROR');
        expect(error?.message).toMatch(expected);
      });
    });
    describe('Adapter.has()', () => {
      it('should return undefined and call onError', async () => {
        let err: CacheException | null = null;
        const error = await cache.has('k', {
          onError: (e) => {
            err = e;
          },
        });
        expect(error).toStrictEqual(undefined);
        const expected = errFmt.getMsg(['has', 'k'], 'COMMAND_ERROR');
        expect((err as any)?.message).toMatch(expected);
      });
    });

    describe('Adapter.set()', () => {
      it('should return error with proper message', async () => {
        const error = await cache.set('k', 'cool');
        expect(error).toBeInstanceOf(CacheException);
        const expected = errFmt.getMsg(['set', 'k'], 'WRITE_ERROR');
        expect((error as any)?.message).toMatch(expected);
      });
    });

    describe('Adapter.setMultiple()', () => {
      it('should return undefined', async () => {
        const firstRet = (await cache.setMultiple([['k', 'value']])).get('k');
        expect(firstRet).not.toBeUndefined();
        expect(firstRet).toBeInstanceOf(CacheException);
        const expected = errFmt.getMsg(['set', 'k'], 'WRITE_ERROR');
        expect((firstRet as any)?.message).toMatch(expected);
      });
    });
    describe('Adapter.delete()', () => {
      it('should return error with proper message', async () => {
        const error = await cache.delete('k');
        expect(error).toBeInstanceOf(CacheException);
        const expected = errFmt.getMsg(['delete', 'k'], 'WRITE_ERROR');
        expect((error as any)?.message).toMatch(expected);
      });
    });

    describe('Adapter.deleteMultiple()', () => {
      it('should return error with proper message', async () => {
        const firstErr = (await cache.deleteMultiple(['k'])).get('k');
        expect(firstErr).toBeInstanceOf(CacheException);
        const expected = errFmt.getMsg(['delete', 'k'], 'WRITE_ERROR');
        expect((firstErr as any)?.message).toMatch(expected);
      });
    });

    describe('Adapter.clear()', () => {
      it('should return error with proper message', async () => {
        const error = await cache.clear();
        expect(error).toBeInstanceOf(CacheException);
        const expected = errFmt.getMsg('clear', 'COMMAND_ERROR');
        expect((error as any)?.message).toMatch(expected);
      });
    });

    describe('Adapter.getOrSet()', () => {
      it('should by default execute the provider function when get/set fails', async () => {
        const { data } = await cache.getOrSet('k', () => 'cool');
        expect(data).toStrictEqual('cool');
      });

      it('should call the onError callback with errors', async () => {
        let errors: CacheException[] = [];
        await cache.getOrSet('k', () => 'cool', {
          onError: (errs) => {
            errors = errs;
          },
        });
        expect(errors.length).toStrictEqual(2);
        const [firstError, secondError] = errors;
        expect(firstError).toBeInstanceOf(CacheException);
        expect(firstError.message).toMatch('READ_ERROR');
        expect(secondError).toBeInstanceOf(CacheException);
        expect(secondError.message).toMatch('WRITE_ERROR');
      });
    });
  });
});
