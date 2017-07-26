(function(){

	function Slider(container, nav) {
		this.container = container;
		this.nav = nav.show();
		this.imgs = this.container.find('img');
		this.imgWidth = this.imgs[0].width;
		this.imgsLen = this.imgs.length;
		this.current = 0;
		//Reference this to pas the slider object
		this.events.click.call(this); 
	}

	//Add a transition to a Slider prototype
	Slider.prototype.transition = function(coords) {
		this.container.animate({
			// if coords is defined use coors, if not preform calculation
			'margin-left' : coords || -(this.current * this.imgWidth),
			//current * image width prepend with neg -
		});
	};

	//Add a setCurrent to our Slider prototype
	Slider.prototype.setCurrent = function(dir) {
		// set pos = current
		var pos = this.current;
		// set direction = direction passed in on button clicl
		this.dir = dir;
		//if direction is next increment by one else decrement by one
		pos = (dir == "next") ? ++pos : --pos;
		//can't use pos here it's only the value not the object
		// if pos == 0 then we go to last image, otherwise
		// we go to the remainder of the pos mod imgsLen ex: 2 % 4 = 2
		this.current = (pos < 0) ? this.imgsLen - 1 : pos % this.imgsLen;
	};

	Slider.prototype.events = {
		click: function(){
			//cache self as this which is the slider, pass in by call
			var self = this;			
			self.nav.find('button').on('click', function(){
				//pass in the data-dir of the button clicked
				self.setCurrent($(this).data('dir')); //This the button clicked
				//transition the slider
				self.transition();
			})
		}
	}

	//grab the slider div, hide the overflow, return ul's to container
	var container = $('div.slider').css('overflow','hidden').children('ul');
	//create a new slider
	var slider = new Slider(container,  $('#slider-nav'));

	//find the buttons and add a click event
	// slider.nav.find('button').on('click', function(){
	// 	//pass in the data-dir of the button clicked
	// 	slider.setCurrent($(this).data('dir'));
	// 	//transition the slider
	// 	slider.transition();
	// })
})();
