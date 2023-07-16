import { CacheItemFactory } from '../cache-item.factory';
import type { CacheItemInterface } from '../cache-item.interface';
import type {
  CacheInterface,
  CacheKey,
  CacheValueProviderFn,
  DeleteOptions,
  GetOptions,
  GetOrSetOptions,
  HasOptions,
  SetOptions,
} from '../cache.interface';
import { ErrorHelper } from '../error/error-helper';
import { CacheException, InvalidCacheKeyException } from '../exceptions';
import { executeValueProviderFn } from '../utils';
import { getGetOrSetCacheDisabledParams } from '../utils/cache-options-utils';
import { Guards } from '../validation/guards';

const defaultGetOrSetOptions: GetOrSetOptions = {
  disableCache: {
    read: false,
    write: false,
  },
} as const;

export abstract class AbstractCacheAdapter<
  TBase = string,
  KBase extends CacheKey = CacheKey,
> implements CacheInterface<TBase, KBase>
{
  // eslint-disable-next-line @typescript-eslint/naming-convention
  protected _errorHelper: ErrorHelper | undefined;

  abstract adapterName: string;

  get errorHelper(): ErrorHelper {
    if (!this._errorHelper) {
      this._errorHelper = new ErrorHelper(
        this.adapterName ?? 'AbstractCacheAdapter'
      );
    }
    return this._errorHelper;
  }

  abstract set<T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: SetOptions
  ): Promise<boolean | CacheException>;

  abstract get<T = TBase, K extends KBase = KBase>(
    key: K,
    options?: GetOptions<T>
  ): Promise<CacheItemInterface<T>>;

  abstract has<K extends KBase = KBase>(
    key: K,
    options?: HasOptions
  ): Promise<boolean | undefined>;

  abstract delete<K extends KBase = KBase>(
    key: K,
    options?: DeleteOptions
  ): Promise<boolean | CacheException>;

  deleteMultiple = async <K extends KBase = KBase>(
    keys: K[],
    options?: DeleteOptions
  ): Promise<Map<K, boolean | CacheException>> => {
    const promises = keys.map((key) => {
      return this.delete(key, options).then(
        (resp): [K, boolean | CacheException] => [key, resp]
      );
    });
    return Promise.all(promises).then((resp) => new Map(resp));
  };

  getMultiple = async <T = TBase, K extends KBase = KBase>(
    keys: K[],
    options?: GetOptions<T>
  ): Promise<Map<K, CacheItemInterface<T>>> => {
    const promises = keys.map((key) => {
      return this.get<T>(key, options).then(
        (item): [K, CacheItemInterface<T>] => [key, item]
      );
    });
    return Promise.all(promises).then((resp) => new Map(resp));
  };

  setMultiple = async <T = TBase, K extends KBase = KBase>(
    keyVals: Readonly<[K, T | CacheValueProviderFn<T>][]>,
    options?: SetOptions
  ): Promise<Map<K, boolean | CacheException>> => {
    const promises = keyVals.map(([key, value]) => {
      return this.set(key, value, options).then((resp) => [key, resp]);
    });
    const responses = (await Promise.all(promises)) as [
      K,
      boolean | CacheException,
    ][];
    return new Map(responses);
  };

  abstract clear(): Promise<true | CacheException>;

  getOrSet = async <T = TBase, K extends KBase = KBase>(
    key: K,
    value: T | CacheValueProviderFn<T>,
    options?: GetOrSetOptions
  ): Promise<CacheItemInterface<T>> => {
    const {
      disableCache = false,
      onError,
      ...setOptions
    } = { ...defaultGetOrSetOptions, ...(options ?? {}) };
    const { read: disableRead, write: disableWrite } =
      getGetOrSetCacheDisabledParams(disableCache);
    const item = await this.get<T, K>(key, { disableCache: disableRead });

    if (item.data !== null) {
      return item;
    }

    const errors: CacheException[] = [];

    if (item.error instanceof InvalidCacheKeyException) {
      return CacheItemFactory.fromErr({
        key,
        error: item.error,
      });
    }

    if (item.error instanceof CacheException) {
      errors.push(item.error);
    }

    let v: T | CacheValueProviderFn<T>;
    let fetched = false;
    if (Guards.isCacheValueProviderFn(value)) {
      try {
        v = await executeValueProviderFn<T>(value);
        fetched = true;
      } catch (e) {
        return CacheItemFactory.fromErr({
          key: key,
          error: this.errorHelper.getCacheProviderException(
            ['getOrSet', key],
            e
          ),
        });
      }
    } else {
      v = value;
    }
    const stored = await this.set(key, v, {
      ...setOptions,
      disableCache: disableWrite,
    });

    if (stored instanceof CacheException) {
      errors.push(stored);
    }

    if (errors.length > 0 && onError) {
      onError(errors);
    }

    return CacheItemFactory.fromOk<T, K>({
      key: key,
      data: v,
      isHit: !fetched,
      isPersisted: stored instanceof CacheException ? false : stored,
    });
  };
}
