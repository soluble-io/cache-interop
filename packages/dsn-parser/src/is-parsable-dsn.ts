import { parseDsn } from './dsn-parser';
import type { ParsableDsn } from './dsn-parser.type';

export const isParsableDsn = (dsn: unknown): dsn is ParsableDsn => {
  const parsed = parseDsn(dsn as string);
  return parsed.success;
};
