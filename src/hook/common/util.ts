/**
 * debounce function wrapper
 *
 * @param {function} fn debounced function
 * @param {number} ms delay millisecond
 * @return {function} wrapper
 *
 * 但是这里的参数依然不起作用，待修改。
 */
export const debounce = (fn: () => void, ms: number): (() => void) => {
  let timer: number | null = null;
  // 需要为this注解类型
  return function (this: Record<string, unknown> | void, ...args: []) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};
