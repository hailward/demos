function debounce(func,wait,immediate) {
  let timeout;
  return function () {
      let context = this;
      let args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
          let callNow = !timeout;
          timeout = setTimeout(() => {
              timeout = null;
          }, wait);
          if (callNow) func.apply(context, args)
      }
      else {
          timeout = setTimeout(() => {
              func.apply(context, args)
          }, wait);
      }
  }
}
function throttle(func, wait ,type) {
  let previous, timeout;
  if(type===1){
      previous = 0;
  }else if(type===2){
      timeout = null;
  }
  return function() {
      let context = this;
      let args = arguments;
      if(type===1){
          let now = Date.now();

          if (now - previous > wait) {
              func.apply(context, args);
              previous = now;
          }
      }else if(type===2){
          if (!timeout) {
              timeout = setTimeout(() => {
                  timeout = null;
                  func.apply(context, args)
              }, wait)
          }
      }

  }
}
module.exports = {
  debounce,
  throttle,
}