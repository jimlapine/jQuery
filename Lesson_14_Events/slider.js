(function($){
	var slider = $('div.slider');
	var sliderUL = slider
		.css('overflow', 'hidden')
		.children('ul');
	var img = sliderUL.find('img');
	var imgWidth = img[0].width;
	var imgLength = img.length;
	var current = 1;
	var totalImgsWidth = img.length * imgWidth;

	$('#slider-nav')
		.show()
		.find('button').on('click', function(){
			var direction = $(this).data('dir'),
				imgLoc = imgWidth;
			//Update current value;
			direction == "next" ? current += 1 : current -= 1;

			if(current === 0) {
				current = imgLength;
				imgLoc = totalImgsWidth - imgWidth;
				direction = 'next'
			} else if(current -1 === imgLength) {
				current = 1;
				imgLoc = 0;				
			}

			transition(sliderUL, imgLoc, direction);
		});

		function transition(container, location, direction){
			var unit;
			if(direction && location != 0){
				unit = (direction == "next") ? "-=" : "+=";
			} 

			container.animate({
				'margin-left' : unit ? (unit + location) : location
			});
		}
})(jQuery);