export function multiplyPropertiesBy<T extends {}>(obj: T, by: number, keys: string[] = []) {
  return Object.entries(obj).reduce((newObj, [key, value]) => {
    if (typeof value == 'number' && keys.includes(key)) {
      newObj[key] = value * by;
    } else {
      newObj[key] = value;
    }
    return newObj;
  }, {} as TODO);
}
