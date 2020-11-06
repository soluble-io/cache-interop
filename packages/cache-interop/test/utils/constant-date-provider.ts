import { DateProvider } from '../../src/date/date-provider.interface';

export class ConstantDateProvider implements DateProvider {
  constructor(private date: Date) {}
  getUnixTime(): number {
    return Math.floor(this.date.getTime() / 1000);
  }
}
