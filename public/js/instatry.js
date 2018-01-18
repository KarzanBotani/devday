$(document).ready(function () {
	setTimeout(function () {
		$('.insta-li').removeClass('hidden');
		$('.insta-view').animate({ opacity: 1 }, 700);
	}, 1100);
});

var feed = new Instafeed({
	get: 'tagged',
	tagName: 'utvecklardag',
	clientId: '2312486313',
	accessToken: '2312486313.ba4c844.9b99a27fdc5a4ee2b6002c9cf5e57c44',
	resolution: 'standard_resolution',
	sortBy: 'most-recent',
	template: '<li class="insta-li hidden"><img src="{{image}}"/></li>',
});

feed.run();

$(window).bind('load', function () {
	$('#instafeed').lightSlider({
		auto: true,
		loop: true,
		pauseOnHover: false,
		item: 1,
		speed: 2000,
		pause: 5000,
		enableDrag: false,
		enableTouch: false,
	});
});
