import { ErrorFormatter } from '../error-formatter';

describe('ErrorFormatter', () => {
  describe('getMsg', () => {
    it('should truncate detail', () => {
      const fmt = new ErrorFormatter('RedisAdapter', 2);
      expect(fmt.getMsg('get', 'READ_ERROR', '12345')).toBe(
        "[RedisAdapter.get()] READ_ERROR: Can't read from the cache (12...)"
      );
    });
    it('should add cache adapter name, set method and message', () => {
      const fmt = new ErrorFormatter('RedisAdapter');
      expect(fmt.getMsg('get', 'READ_ERROR')).toBe(
        "[RedisAdapter.get()] READ_ERROR: Can't read from the cache"
      );
    });
    it('should accept a detail parameter', () => {
      const fmt = new ErrorFormatter('Adapter');
      expect(fmt.getMsg('get', 'READ_ERROR', 'cause...')).toBe(
        "[Adapter.get()] READ_ERROR: Can't read from the cache (cause...)"
      );
    });
    it('should add the key in method if provided', () => {
      const fmt = new ErrorFormatter('Adapter');
      expect(fmt.getMsg(['get', 'key'], 'READ_ERROR', 'cause...')).toBe(
        "[Adapter.get(key)] READ_ERROR: Can't read from the cache (cause...)"
      );
    });

    it('should allow replacing message', () => {
      const fmt = new ErrorFormatter('Adapter');
      expect(fmt.getMsg('get', 'READ_ERROR', null, 'Hello')).toBe(
        '[Adapter.get()] READ_ERROR: Hello'
      );
    });
  });
});
