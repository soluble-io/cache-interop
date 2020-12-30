import { CacheItemInterface, CacheItemMetadata } from './cache-item.interface';
import { CacheException } from './exceptions/cache.exception';
import { CacheKey } from './cache.interface';

export type CacheItemPropsOk<T, K extends CacheKey = CacheKey> = {
  success: true;
  data: T | null;
  key: K;
  error?: never;
  isHit: boolean;
  isPersisted?: boolean;
};

export type CacheItemPropsErr<K extends CacheKey = CacheKey> = {
  success: false;
  error: CacheException;
  key: K;
  data?: never;
  isHit?: never;
  isPersisted?: boolean;
};

type CacheItemProps<T, K extends CacheKey = CacheKey> = CacheItemPropsOk<T, K> | CacheItemPropsErr<K>;

export class CacheItem<T, KBase extends CacheKey = CacheKey> implements CacheItemInterface<T, KBase> {
  public readonly isSuccess: boolean;
  public readonly data: T | null;
  public readonly error: CacheException | undefined;
  public readonly metadata: CacheItemMetadata<KBase>;
  public readonly isHit: boolean;
  public readonly isPersisted: boolean | null;

  constructor(props: CacheItemProps<T, KBase>) {
    this.isSuccess = props.success;
    this.data = props.success ? props.data : null;
    this.error = props.success ? undefined : props.error;
    this.metadata = { key: props.key };
    this.isHit = props.success ? props.isHit : false;
    this.isPersisted = props.isPersisted ?? null;
  }
}
