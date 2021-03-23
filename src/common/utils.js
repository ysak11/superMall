//节流函数
export function throttle(fn, delay) {
  let pre = new Date().getTime();
  return function() {
    let now = new Date().getTime();
    if(now - pre > delay) {
      pre = now;
      fn.apply(this, ...arguments);
    }
  }
}

//防抖函数
export function debounce(fn, delay) {
  let pre = new Date().getTime();
  return function() {
    let now = new Date().getTime();
    let context = this;
    if(now - pre > delay) {
      fn.apply(context, ...arguments);
    }
    now = pre;
  }
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};