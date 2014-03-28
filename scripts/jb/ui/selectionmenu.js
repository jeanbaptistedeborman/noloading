
/*
 @author : Jean-Baptiste de Borman jb@noloading.com

 @constructor
 @description : A simpe menu serving as a selection menu (acting like radio buttons). Buttons switch to "on" when clicked, and to "off" when clicked again or another button is selected.
 
 @param {object} items_$ : the JQUERY list of Buttons
 @param  {object} selectionButton_$ ; an optional parameter with the graphics displayed on the choosen button.
 @event {function} onSelect : emitted when the user changes or suppresses a selection
 
 @property {object}  selection_$ : the jquery selection of the selected button.
 @property {int} selected_index : the number of the selected button.
 */

function SelectionMenu(items_$, selectionButton_$) {
	"use strict"; 
	var context = this;
	this.selection_$; 
	this.selected_index; 

	items_$.on('click', function() {
		var this_$ = $(this);

		var switchOff_bool = this_$.hasClass('on');

		if (switchOff_bool) {
			context.selected_index = null;
			context.selection_$ = null;
			context.onSelect();
			if (selectionButton_$) {
				selectionButton_$.detach();

			}

		} else {
			if (selectionButton_$) {
				this_$.append(selectionButton_$)

			}

			items_$.each(function(index, element) {
				var element_$ = $(element);
				if (element_$.hasClass('on')) {
					element_$.removeClass('on');

				}
			})
			context.selected_index = this_$.index();
			context.selection_$ = this_$;

			context.onSelect();

		}

		this_$.toggleClass('on');

	})
}