const prm = $('.panorama');
const len = prm.children().length;
const cs = [];
const img = new Image();
img.src = './img/ani.png';
img.onload = e => {
  $.each(prm.children(), (i, canvas) => {
    let w = img.width / len;
    let h = img.height;
    canvas.width = canvas.clientWidth = 122;
    canvas.height = canvas.clientHeight = h;
    canvas.id = i;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, i * w, 0, w, h, 0, 0, canvas.width, canvas.height);
    cs.push({
      canvas,
      ctx
    });
  });
  cs.forEach((v, i, arr) => {
    let c = v.canvas;
    $(c).css({
      'transform': `rotateY(${360 / arr.length * i}deg) translateZ(24rem)`
    });
  });
}
let sx = 0;
let x = 0;
prm.on('touchstart', function (e) {
  e.preventDefault();
  sx = e.targetTouches[0].pageX - x;
});
prm.on('touchmove', function (e) {
  e.preventDefault();
  x = Math.floor(e.targetTouches[0].pageX - sx)
  $(this).css({
    'transform': `rotateY(${x}deg)`
  });
});
prm.on('mousedown', function (e) {
  e.preventDefault();
  sx = e.pageX - x;
  prm.on('mousemove', function (e) {
    e.preventDefault();
    x = Math.floor(e.pageX - sx);
    $(this).css({
      'transform': `rotateY(${x}deg)`
    });
  });
});
prm.on('mouseup', function (e) {
  $(this).off('mousemove');
});
