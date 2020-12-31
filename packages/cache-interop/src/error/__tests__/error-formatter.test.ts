import { ErrorFormatter } from '../error-formatter';

describe('ErrorFormatter', () => {
  describe('getMsg', () => {
    it('should add cache adapter name, set method and message', () => {
      const fmt = new ErrorFormatter('RedisAdapter');
      expect(fmt.getMsg('get', 'READ_ERROR')).toBe("[RedisAdapter.get()] READ_ERROR: Can't read from the cache");
    });
    it('should allow detail', () => {
      const fmt = new ErrorFormatter('Adapter');
      expect(fmt.getMsg('get', 'READ_ERROR', 'cause...')).toBe(
        "[Adapter.get()] READ_ERROR: Can't read from the cache (cause...)"
      );
    });
    it('should allow replacing message', () => {
      const fmt = new ErrorFormatter('Adapter');
      expect(fmt.getMsg('get', 'READ_ERROR', null, 'Hello')).toBe('[Adapter.get()] READ_ERROR: Hello');
    });
  });
});
