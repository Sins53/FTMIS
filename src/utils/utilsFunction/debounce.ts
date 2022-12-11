// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(func: Function, timeout: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    const next = () => func(...args);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(next, timeout > 0 ? timeout : 300);
  };
}
