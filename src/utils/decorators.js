import { Debounce, Throttle } from './throttle';

/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
// 网络防抖 300ms内有新的请求都会重置，直到300毫秒内没有输入
export function DeocratorOfDebounceTime(timeout = 300) {
  return (target, property, descriptor) => {
    const func = descriptor.value;
    const debounce = new Debounce(timeout);
    descriptor.value = function temp() {
      debounce.execute(() => func.apply(this, arguments));
    };
  };
}

// 节流函数 忽略一定时间段内的其他的操作
export function DecoratorOfThrottleTime(timeout = 300) {
  return (target, property, descriptor) => {
    const func = descriptor.value;
    const throttle = new Throttle(timeout);
    descriptor.value = function temp() {
      throttle.execute(() => func.apply(this, arguments));
    };
  };
}

// 保证同一个请求只会在返回结果后才会进行下一次请求，新的请求都会被忽略
export function DecoratorOfPending() {
  return (target, property, descriptor) => {
    const func = descriptor.value;
    let running = false;
    // pendding住的方法，其实还是掉了的，只不过是等第一个调完
    let arr = [];
    // 重新定义方法
    descriptor.value = function temp() {
      const args = arguments;
      if (running) {
        // 表示已经有请求在了，不要重复的去做了
        return new Promise((resolve, reject) => {
          arr.push((err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      } else {
        // 没有请求阻塞，直接走着
        running = true;
        const res = func.apply(this, args);
        // 也有可能不是promise
        if (res && res.then) {
          return res
            .then(data => {
              arr.forEach(item => item && item(null, data));
              return data;
            })
            .catch(e => {
              arr.forEach(item => item && item(e));
              return e;
            })
            .finally(() => {
              running = false;
              arr = []; // arr需要重置
            });
        } else {
          // 不是promise直接返回
          // 由于是同步，所以不需要跑arr
          running = false;
          return res;
        }
      }
    };
  };
}
