// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const browserSupportsRaf =
  window.requestAnimationFrame ||
  (window as any).webkitRequestAnimationFrame ||
  ((window as any).mozRequestAnimationFrame && (window as any).mozCancelRequestAnimationFrame) || // Firefox 5 ships without cancel support
  (window as any).oRequestAnimationFrame ||
  (window as any).msRequestAnimationFrame;

const requestTimeoutNoRaf = (fn: any, delay: number, registerCancel?: any) => {
  const timeoutId = setTimeout(fn, delay);
  registerCancel && registerCancel(() => clearTimeout(timeoutId));
};

const requestTimeoutRaf = (fn: any, delay: any, registerCancel: any) => {
  const start = new Date().getTime();

  const loop = () => {
    const delta = new Date().getTime() - start;

    if (delta >= delay) {
      fn();
      registerCancel && registerCancel(noop);
      return;
    }

    const raf = requestAnimationFrame(loop);
    registerCancel && registerCancel(() => cancelAnimationFrame(raf));
  };

  const raf = requestAnimationFrame(loop);
  registerCancel && registerCancel(() => cancelAnimationFrame(raf));
};

// eslint-disable-next-line no-extra-boolean-cast
export const requestTimeout = Boolean(browserSupportsRaf) ? requestTimeoutRaf : requestTimeoutNoRaf;

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
