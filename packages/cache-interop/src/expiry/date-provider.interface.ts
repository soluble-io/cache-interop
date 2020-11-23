import { UnixTime } from './es-date-provider';

export interface DateProvider {
  /**
   * @param date
   */
  convertDateToUnixTime(date: Date): UnixTime;

  /**
   * Return the current time as Unix Timestamp (number of seconds since January 1, 1970)
   */
  getUnixTime(): UnixTime;
}
