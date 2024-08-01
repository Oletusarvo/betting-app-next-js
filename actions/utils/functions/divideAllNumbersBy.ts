export function divideAllNumbersBy<T extends {}>(obj: T, divideBy: number, exclude: string[] = []) {
  return Object.entries(obj).reduce((newObj, [key, val]) => {
    let newVal = val;
    if (typeof newVal == 'number' && !exclude.includes(key)) {
      newVal /= divideBy;
    }
    newObj[key] = newVal;
    return newObj;
  }, {} as TODO);
}
