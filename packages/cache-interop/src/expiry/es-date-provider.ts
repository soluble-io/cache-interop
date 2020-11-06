import { DateProvider } from './date-provider.interface';

export class EsDateProvider implements DateProvider {
  getUnixTime(): number {
    return Math.floor(Date.now() / 1000);
  }
}
