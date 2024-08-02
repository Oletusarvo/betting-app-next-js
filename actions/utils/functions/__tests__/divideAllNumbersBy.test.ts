import { divideAllNumbersBy } from '../divideAllNumbersBy';

describe('Testing the divideAllNumbersBy-function', () => {
  it('Divides all strings convertible to numbers correctly by the defined value', () => {
    const initialNumber = 1000;
    const obj = {
      value: initialNumber.toString(),
    };

    const divideBy = 100;
    const newObj = divideAllNumbersBy(obj, divideBy);
    expect(newObj.value).toBe(initialNumber / divideBy);
  });

  it('Does not divide non-number strings.', () => {
    const initialValue = 'kalja';
    const obj = {
      value: 'kalja',
    };
    const newObj = divideAllNumbersBy(obj, 100);
    expect(newObj.value).toBe(initialValue);
  });

  it('Excludes keys defined in the exclude-argument from division', () => {
    const obj = {
      key1: 1000,
      key2: 1000,
      key3: 1000,
    };

    const newObj = divideAllNumbersBy(obj, 100, ['key1', 'key2']);
    expect(newObj.key1).toBe(1000);
    expect(newObj.key2).toBe(1000);
    expect(newObj.key3).toBe(1000 / 100);
  });
});
