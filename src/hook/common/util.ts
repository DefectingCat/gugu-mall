type Debounce = {
  <T extends unknown[]>(fn: (...arg: T) => void | unknown, ms: number): (
    this: unknown,
    ...arg: T
  ) => void | unknown;
};

/**
 * debounce function wrapper
 *
 * @param {function} fn debounced function
 * @param {number} ms delay millisecond
 * @return {function} wrapper
 *
 */
export const debounce: Debounce = (fn, ms) => {
  let timer: number | null = null;
  // 需要为this注解类型
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};
