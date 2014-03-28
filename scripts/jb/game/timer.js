/**
 @author : Jean-Baptiste de Borman - jb@noloading.com

 @description : A countdown, able to display an animation or remaining time as mm:ss:cc;

 @constructor
 @param  {object} display_$: [otional] the jquery-html element displaying the countdown
 @param {number} time_sec : the delay of the countdown
 @param {object} animation : [optional] Instance from the cals Animation_jb used to display the countdown.

 @event Timer_jb#onTimerFinish : called when time is up; 

 @function start : starts the countdown
 @function stop : stops the timer
 @function reset : resets the timer to 0;
 @function destroy : removes and clean, stops the timer.

 */

var Timer_jb = function(display_$, time_sec, animation) {

	var context = this;

	var startTime_mil = time_sec * 1000;
	var originalTime_mil = startTime_mil;
	var intervalTime_mil = 23;

	var conversions = new Conversions_jb();
	var animation_bool = animation != undefined;

	if (animation_bool) {
		display_$.append(animation.tag_$);

	}

	this.onTimerFinish = function() {

		//Event placeholder;
	}
	this.start = function() {
		context.reset();
		context.interval = window.setInterval(context.updateTimer, intervalTime_mil);
	}

	this.stop = function() {
		window.clearInterval(context.interval);
	}

	this.reset = function() {
		context.stop();
		startTime_mil = originalTime_mil;
		context.updateTimer();

	}

	this.destroy = function() {
		context.stop();

	}

	this.updateTimer = function() {

		display(startTime_mil);
		startTime_mil -= intervalTime_mil;
		if (startTime_mil <= 0) {

			display(0);
			context.onTimerFinish();
		}
	}
	function display(num_mil) {
		if (animation_bool) {
			animation.gotoAndStop(Math.ceil((originalTime_mil - num_mil) / originalTime_mil * animation.totalFrames));
		} else {
			if (display_$) {
				display_$.text(conversions.numberToTime(num_mil, conversions.PARAM_SECONDES));
			}
		}

	}

}