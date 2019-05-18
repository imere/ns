const css3d = $('.css3d');
const divs = css3d.children();
const len = divs.length;
const r = Math.floor(parseFloat(window.getComputedStyle(divs[0]).width) / 2 / Math.tan(360 / len / 2));
console.log('r', r)
console.log('w', parseFloat(window.getComputedStyle(divs[0]).width))
$.each(divs, (i, div) => {
	$(div).css({
		'background': `url('./img/p${i+1}.png') no-repeat`,
		'transform': `rotateY(${360 / len * i}deg) translateZ(${390 || r}px)`
	})
});
let sx = 0;
let x = 0;
css3d.on('touchstart', function (e) {
	e.preventDefault();
	sx = e.targetTouches[0].pageX - x;
});
css3d.on('touchmove', function (e) {
	e.preventDefault();
	x = Math.floor(e.targetTouches[0].pageX - sx)
	css3d.css({
		'transform': `rotateY(${x}deg)`
	});
});
$('button').on('click', function (e) {
	const a = $('audio')[0];
	if (a.paused) {
		a.play();
		$(this).text('⏸')
	} else {
		a.pause();
		$(this).text('▶')
	}
})
