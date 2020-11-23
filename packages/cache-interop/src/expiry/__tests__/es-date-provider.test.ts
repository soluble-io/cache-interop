import { EsDateProvider } from '../es-date-provider';
import { dayjsUtc } from '../../../test/utils/dayjs-utc';

describe('EsDateProvider convertDateToUnixtime', () => {
  describe('when date is given', () => {
    const dateProvider = new EsDateProvider();
    it('should return the correct unix timestamp', () => {
      const nowUtc = dayjsUtc(new Date('11 Nov 2020 12:49:10').toUTCString());
      expect(dateProvider.convertDateToUnixTime(nowUtc.toDate())).toStrictEqual(1605095350);
    });
  });
});
