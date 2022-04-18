import type { DateProvider } from './date-provider.interface';

export type UnixTime = number;

export class EsDateProvider implements DateProvider {
  getUnixTime(): UnixTime {
    return Math.floor(Date.now() / 1000);
  }
}
