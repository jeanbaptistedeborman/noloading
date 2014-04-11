// JavaScript Document
/*
 @constructor
 @description : this class completes a responsive css and is meant to improve the user experience on mobile devices. When the screen is switched from portrait to landscape, the scroll changes form vertical to horizontal and the items are stacked horizontally ("float:left") instead of vertically;

 The code is not fully abstracted from this specific project and uses a lot of global variables. It is therefore not reusable in its current state.

 @param  {object} scroll_$ : a JQUERY selection of the container(s) handling the scroll (does not necessarily match the direct parent of the displayed items).
 @param {object} container_$ : a JQUERY selection of the parent containing the items.
 */

/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $, trace, ScreenTools, openItems_array, ArrayTools, project_$, Implementation, OPEN_WIDTH*/

ResponsiveTiles = function(scroll_$, container_$) {"use strict";

	var boxDefaultWidth_num;
	var boxDefaultHeight_num;

	//SPECIFIC METHODS FOR THIS PROJECT
	var _findDefaultHeight = function() {

		if (true || !boxDefaultHeight_num) {

			var testHeight_num = 10000;

			project_$.each(function(index, element) {
				var element_$ = $(element);

				var elHeight_num = element_$.outerHeight(true);
				if (elHeight_num < testHeight_num) {
					testHeight_num = elHeight_num;
				}
			});
			boxDefaultHeight_num = testHeight_num;

		}

	};
	var _findDefaultWidth = function() {


		if (!boxDefaultWidth_num || boxDefaultWidth_num < 100) {
			var testWidth_num = 100000;
			project_$.each(function(index, element) {
				var element_$ = $(element);

				var elWidth_num = element_$.outerWidth(true);

				if (elWidth_num < testWidth_num) {
					testWidth_num = elWidth_num;
				}
			});
			boxDefaultWidth_num = testWidth_num;

		}
	};

	this.arrange = function() {
		var items_$ = container_$.children(), portrait_bool = ScreenTools.isPortrait(), selected_$, scrollPos;

		if (openItems_array.length > 0) {
			selected_$ = openItems_array[openItems_array.length - 1];

		}

		if (!portrait_bool && Implementation.allowChangeScrollDirection()) {
			_findDefaultWidth();
			
			var bodyWidth_num = 0;
			scrollPos = -1;
			items_$.each(function(index, element) {
				var width_num = 0;

				var element_$ = $(element);
				var selected_bool = ArrayTools.contains(openItems_array, element_$, true);


				if (selected_bool) {
					scrollPos = element_$.index() * boxDefaultWidth_num;
					var margins_num = Number(element_$.css ('marginLeft').split ('px')[0]) * 2;
					trace ("margin css : " + element_$.css ('margin'));
					var baseWidth_str = element.style.width;
					trace ("SELECTED MARGIN : " + margins_num);
					width_num = Number(baseWidth_str.split ('px')[0]) + margins_num;
				} else {
					if (element_$.width() > boxDefaultWidth_num) {
						width_num = element_$.width();
					} else {
						width_num = boxDefaultWidth_num;
					}
				}
				
				
				trace ("WIDTH:" + width_num); 
				bodyWidth_num += width_num;

			});
				//bodyWidth_num  = 10000; 
			trace ("TOTAL:" + bodyWidth_num); 
			scroll_$.width(bodyWidth_num);
			var margin_num = 0;

			if (scrollPos !== -1) {
				var cssMargins = parseInt(project_$.css('margin-left'), 10) * 2;
				margin_num = (window.innerWidth - OPEN_WIDTH) / 2;
				scroll_$.animate({
					scrollLeft : scrollPos - margin_num
				}, 100);
			}

		}

		scrollPos = -1;

		if ((portrait_bool || !Implementation.allowChangeScrollDirection())) {
			_findDefaultHeight();
			scroll_$.width("");
			trace("selected_$ : " + selected_$);
			trace("boxDefaultHeight_num = " + boxDefaultHeight_num);
			if (selected_$ !== undefined) {

				scrollPos = (Number(selected_$.index() - 1) * boxDefaultHeight_num) + 300;
				trace(scrollPos);

				scroll_$.animate({
					scrollTop : scrollPos
				}, 200)
			} else {
				//scrollPos = 0;

			};

		}
	};

};
