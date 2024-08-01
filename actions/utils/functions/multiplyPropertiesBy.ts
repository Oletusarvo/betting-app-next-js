export function multiplyPropertiesBy<K extends string[], T extends {}>(
  obj: T,
  by: number,
  props: K
) {
  return Object.entries(obj).reduce((newObj, [key, value]) => {
    if (typeof value == 'number' && props.includes(key)) {
      newObj[key] = value * by;
    } else {
      newObj[key] = value;
    }
    return newObj;
  }, {} as TODO);
}
