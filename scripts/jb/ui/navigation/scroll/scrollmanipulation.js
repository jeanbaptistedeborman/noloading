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

	this.evaluateActiveArrows = function (position) {
		
		var maxScroll = target_$.width () - container_width,  
		minScroll = 0; 
		
		var scrollLeft = target_$.scrollLeft() + (position);

		if (scrollLeft >= maxScroll) {
			
			uiElements.rightButton_$.hide (); 
			
		} else {
			uiElements.rightButton_$.show (); 
			
		} 
		if (scrollLeft <= minScroll) {
			
			uiElements.leftButton_$.hide (); 
			
		}  else {
			uiElements.leftButton_$.show (); 
			
		}
		
	};


	this.swipe = function(direction_int, distance_num) {
		var n;
		//minScroll = target_$.w
		
		var position_num = distance_num * direction_int; 
		
		
		 this.evaluateActiveArrows (distance_num * direction_int); 
		var scrollLeft = target_$.scrollLeft() + (position_num);
		//trace('scrollLeft : ' + scrollLeft);
		
		target_$.stop ().animate({
			scrollLeft : scrollLeft
		}, 500);

		for (n in uiElements) {
			var uiElement_$ = uiElements[n];
			if (uiElement_$.jquery) {
				/* addClass does not work on SVG. Patch here : http://keith-wood.name/svg.html#dom */
				uiElement_$.attr('class', "svgArrow active");

			}

		}

	};
	
	
}

/*
 @description: an instancieated object to collect the uiElments affectd by the scroll
 */
ScrollManipulation.UIElements = function() {"use strict";

	this.leftButton_$ = "test_a";
	this.rightButton_$ = "test_b";
};

