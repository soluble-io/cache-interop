import type { GetOrSetOptions } from '../cache.interface';

type GetOrSetCacheDisabledParams = {
  read: boolean;
  write: boolean;
};

/**
 * @internal
 */
export const getGetOrSetCacheDisabledParams = (
  disableCache: GetOrSetOptions['disableCache'] = false
): GetOrSetCacheDisabledParams => {
  const disabled: GetOrSetCacheDisabledParams =
    typeof disableCache === 'boolean'
      ? {
          write: disableCache,
          read: disableCache,
        }
      : {
          write: disableCache.write,
          read: disableCache.read,
        };
  return disabled;
};
