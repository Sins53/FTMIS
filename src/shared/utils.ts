export function sanitizeURL(url: string, pathVariables?: { [key: string]: Primitive }) {
  if (pathVariables && Object.keys(pathVariables).length) {
    return Object.entries(pathVariables).reduce((acc, [key, value]) => {
      return acc.replace(`:` + key, value?.toString());
    }, url);
  }
  return url;
}
