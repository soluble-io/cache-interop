export interface DateProvider {
  /**
   * Return the current time as Unix Timestamp (seconds since January 1, 1970)
   */
  getUnixTime(): number;
}
