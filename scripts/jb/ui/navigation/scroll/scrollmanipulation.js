/*
 @author : Jean-Baptiste de Borman jb@noloading.com

 @description: a class dedicated to scroll manipulations
 @ param {object} target_$ :  a jQuery selection of the container where the scroll is happening.
 @param {object} uiElements : an instance of the ScrollManipulation.uiElements containing a reference to the navigation buttons.
 @function swipe: scrolls the container
 */

/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $, trace, SVGFactory, SelectionMenu,Implementation,project_$, ScreenTools,  _gaq , isTouch*/

function ScrollManipulation(target_$, uiElements, container_width) {"use strict";

	var context = this;

	this.evaluateActiveArrows = function() {
	

		var maxScroll = target_$.width() - target_$[0].scrollWidth, minScroll = 0;

		var scrollLeft = target_$.scrollLeft();
		

		var left_bool = scrollLeft > minScroll;
		var right_bool = scrollLeft < -maxScroll;  
		
		

		
		uiElements.rightButton_$.toggle(right_bool);
		uiElements.leftButton_$.toggle (left_bool); 
	};
	this.scroll = function(distance_num) {

		target_$.stop().animate({
			scrollLeft : distance_num
		}, 500, context.evaluateActiveArrows);
	};

	this.swipe = function(direction_int, distance_num) {
		var n;

		var position_num = distance_num * direction_int;
		var scrollLeft_num = target_$.scrollLeft() + (position_num);

		context.scroll(scrollLeft_num);

	};

}

/*
 @description: an instancieated object to collect the uiElments affectd by the scroll
 */
ScrollManipulation.UIElements = function() {"use strict";

	this.leftButton_$ = "test_a";
	this.rightButton_$ = "test_b";
};

