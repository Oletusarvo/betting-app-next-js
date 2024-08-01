export function objectFromQueryParams(queryParams: URLSearchParams) {
  const queryObject: Record<string, string> = {};
  for (const [key, value] of queryParams.entries()) {
    queryObject[key] = value;
  }

  return queryObject;
}
