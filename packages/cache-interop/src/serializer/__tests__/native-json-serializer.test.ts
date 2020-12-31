import { NativeJsonSerializer } from '../native-json-serializer';

describe('NativeJsonSerializer', () => {
  const json = new NativeJsonSerializer();
  describe('encode', () => {
    describe('when a supported value is given', () => {
      it('should serialize in valid json', () => {
        expect(json.encode({})).toStrictEqual('{}');
        expect(json.encode(null)).toStrictEqual('null');
        expect(json.encode('null')).toStrictEqual('"null"');
      });
    });
    describe('when an unsupported value is given', () => {
      it('should throw a TypeError', () => {
        expect(() => json.encode(undefined as any)).toThrow(TypeError);
      });
    });
  });

  describe('decode', () => {
    describe('when a supported value is given', () => {
      it('should decode valid json', () => {
        expect(json.decode('{}')).toStrictEqual({});
        expect(json.decode('null')).toStrictEqual(null);
        expect(json.decode(null as any)).toStrictEqual(null);
      });
    });
    describe('when an unsupported value is given', () => {
      it('should throw a SyntaxError', () => {
        expect(() => json.decode(undefined as any)).toThrow(SyntaxError);
      });
    });
  });
});
