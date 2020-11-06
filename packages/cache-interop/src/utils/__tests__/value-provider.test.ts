import { executeValueProviderFn } from '../value-provider';

describe('when value is a native async function', () => {
  it("should call the function and return it's value", async () => {
    const fn = jest.fn();
    const asyncFn = async () => {
      fn();
      return 'cool';
    };
    expect(await executeValueProviderFn(asyncFn)).toBe('cool');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('when value is a function', () => {
  it("should call the function and return it's value", async () => {
    const fn = jest.fn(() => 'cool');
    expect(await executeValueProviderFn(fn)).toBe('cool');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
