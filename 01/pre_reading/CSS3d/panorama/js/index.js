const m = $(".m");
let sx = 0;
let x = 0;
m.on("touchstart", function(e) {
  e.preventDefault();
  sx = e.targetTouches[0].pageX - x;
});
m.on("touchmove", function(e) {
  e.preventDefault();
  x = Math.floor(e.targetTouches[0].pageX - sx);
  m.css({
    transform: `rotateY(${x}deg)`
  });
});
m.on("mousedown", function(e) {
  e.preventDefault();
  sx = e.pageX - x;
  m.on("mousemove", function(e) {
    e.preventDefault();
    x = Math.floor(e.pageX - sx);
    $(this).css({
      transform: `rotateY(${x}deg)`
    });
  });
});
m.on("mouseup", function(e) {
  $(this).off("mousemove");
});
window.ondeviceorientation = function(e) {
  console.log(e);
  x = Math.floor(e.gamma - sx);
  m.css({
    transform: `rotateY(${x}deg)`
  });
};
