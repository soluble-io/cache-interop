import { CacheInterface } from '../cache.interface';
import { ConnectedAdapterInterface } from './connected-adapter.interface';

type UnkownCacheAdapter = CacheInterface | ConnectedAdapterInterface<unknown>;

export function isConnectedAdapter(adapter: UnkownCacheAdapter): adapter is ConnectedAdapterInterface<unknown> {
  return typeof ((adapter as unknown) as ConnectedAdapterInterface<unknown>)?.getConnection === 'function';
}
