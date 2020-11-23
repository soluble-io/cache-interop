import { DateProvider } from './date-provider.interface';

export type UnixTime = number;

export class EsDateProvider implements DateProvider {
  convertDateToUnixTime(date: Date): UnixTime {
    return Math.floor(date.getTime() / 1000);
  }

  getUnixTime(): UnixTime {
    return Math.floor(Date.now() / 1000);
  }
}
