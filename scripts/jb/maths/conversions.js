/*jslint vars:true, white:true, nomen:true, plusplus:true */

function Conversions_jb () {
	"use strict"; 
		this.PARAM_MINUTES = "minutes";
		this.PARAM_seconds = "seconds";
		this.numberToTime  = function (milliseconds, valeur_param) {
			var heures_num = Math.floor(milliseconds / 36000000);
			var minutes_num = Math.floor((milliseconds%3600000)/60000);
			var seconds_num = Math.floor ((milliseconds%60000)/1000);
			var centiemes_num = Math.floor ((milliseconds%1000)/10);
			var heures_str = this.numberToString(heures_num,2);
			var minutes_str = this.numberToString(minutes_num,2);
			var seconds_str= this.numberToString(seconds_num,2);
			var centiemes_str = this.numberToString(centiemes_num,2);
			var result_str = centiemes_str;
			if (valeur_param === "seconds" || valeur_param === "minutes") {
				result_str = seconds_str + ":" + result_str;
				
			}
			if (valeur_param === "minutes") {
				result_str = minutes_str + ":" + result_str;

			}


			return result_str;
		}; 
		
		
	 this.numberToString = function (number, stringLength) {
			var string = String(number);
			while (string.length < stringLength) {

				string = "0" + string;


			}
			return string;

		}; 
} 
