export class Debounce {
  timeSchedule = null;

  constructor(timeout = 300) {
    this.timeout = timeout;
  }

  execute(func = () => {}) {
    clearTimeout(this.timeSchedule);
    this.timeSchedule = setTimeout(() => {
      func();
    }, this.timeout);
  }
}


export class Throttle {
  timeSchedule = null;

  timeout = 50;

  constructor(timeout = 50) {
    this.timeout = timeout;
  }

  // 这个时间段内的请求直接忽略
  execute(func = () => {}) {
    if (this.timeSchedule) {
      return;
    }
    this.timeSchedule = setTimeout(() => {
      this.timeSchedule = null;
    }, this.timeout)
    func();
  }
}