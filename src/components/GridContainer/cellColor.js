export function animationFunc(node, target, direction) {
  // node是对应DOM元素
  let timer = null;
  timer = setInterval(function () {
    let speed = (target - parseInt(node.style[direction])) / 5;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    node.style[direction] = parseInt(node.style[direction]) + speed + 'px';
    if (parseInt(node.style[direction]) === target) {
      clearInterval(timer);
    }
  }, 100);
}

export const cellBackgroundColor = number => {
  switch (number) {
    case 2:
      return '#eee4da';
    case 4:
      return '#ede0c8';
    case 8:
      return '#f2b179';
    case 16:
      return '#f59563';
    case 32:
      return '#f67c5f';
    case 64:
      return '#f65e3b';
    case 128:
      return '#edcf72';
    case 256:
      return '#edcc61';
    case 512:
      return '#9c0';
    case 1024:
      return '#33b5e5';
    case 2048:
      return '#09c';
    case 4096:
      return '#a6c';
    case 8192:
      return '#93c';
    default:
      return;
  }
};

export const cellColor = number => {
  switch (number) {
    case 2:
    case 4:
      return 'rgb(120,110,100)';
    default:
      return;
  }
};

export const cellFontSize = number => {
  if (number < 10) {
    return '55px';
  } else if (number < 100) {
    return '50px';
  } else if (number < 1000) {
    return '45px';
  } else if (number >= 1000) {
    return '40px';
  }
};
