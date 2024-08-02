export function divideAllNumbersBy<T extends {}>(obj: T, divideBy: number, exclude: string[] = []) {
  return Object.entries(obj).reduce((newObj, [key, val]) => {
    let newVal = val;
    const keyIsExcluded = exclude.includes(key);

    if (!keyIsExcluded) {
      if (typeof newVal == 'string') {
        const convertedValue = parseInt(newVal);
        if (!isNaN(convertedValue)) {
          newVal = parseInt(newVal) / divideBy;
        }
      } else if (typeof newVal == 'number') {
        newVal /= divideBy;
      }
    }

    newObj[key] = newVal;
    return newObj;
  }, {} as TODO);
}
