/**
 * 
 * JqueryBuzz  plugin 
 * 
 * Version 0.1 (16.01.2013)
 * zona111.it
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * @author Rosario Capparelli
 * @since 2013
 *
 *
 */
 
(function($) {
	$.fn.jquerybuzz = function(options) {
		
		// valori di default
		var config = {
            'inputfile': 'mysound',
            'autoplay': 'false'  //autoplay option not implemented
        };

		if (options) $.extend(config, options);

		if (!buzz.isSupported()) {
		    alert("Your browser is too old, time to update!");
			return this;
		}
		if (!buzz.isOGGSupported() && !buzz.isMP3Supported()) {
		    alert("Your browser doesn't support OGG and Mp3 Format.");
			return this;
		}

		$(this).html("<div id='playwait111' class='play111' title='click to load music...'></div>");
		
		var mySoundMp3, mySoundOgg;
		
		$('#playwait111').click(
			function() {
				$(this).replaceWith("<div id='loadingsoundmp3111' class='loading111' title='loading sound...'></div>");
				console.log("loading");
				mySoundMp3 = new buzz.sound(config.inputfile+'.mp3',{
					preload: false,
					autoplay: false,
					loop: true
				});
				
				mySoundMp3.bind( "loadeddata", function(e) {
					console.log("loaded");
					$('#loadingsoundmp3111').replaceWith("<div id='loadedsoundmp3111' class='play111' title='click to play music...'></div>");	
					$('#loadedsoundmp3111').click(
    					function (){
							$(this).replaceWith("<div id='playngsoundmp3111' class='stop111' title='playng sound...'></div>");
							mySoundMp3.play();
							console.log("playng");

							$('#playngsoundmp3111').click(
		    					function (){
									$(this).replaceWith("<div id='loadedsoundmp3111' class='play111' title='click to play music...'></div>");
									mySoundMp3.stop();
									console.log("stop");
									
									$('#loadedsoundmp3111').click(
		    							function (){
											$(this).replaceWith("<div id='playngsoundmp3111' class='stop111' title='playng sound...'></div>");
											mySoundMp3.play();
											console.log("play");
										}
									);
								}
							);
							
			            }
					);
				});
			}
		);
		
		return this;
	}
})(jQuery);
