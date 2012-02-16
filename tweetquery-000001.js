/*!
 * tweetQuery
 * Copyright: CC0 aka Public Domain
 * http://creativecommons.org/publicdomain/zero/1.0/
 * Version: .000001
 * Requires: jQuery v1.3.2 or later
 * Twitter API docs: https://dev.twitter.com/docs/api/1/get/statuses/user_timeline
 * Twitter Endpoint: https://api.twitter.com/1/statuses/user_timeline.json
 */

(function( $ ) {
  	$.fn.tweetQuery = function(options) {
		// set up default options
		var defaults = {
			username: 	"twitter", //twitter api version: screen_name
			tweetcount:	5, //twitter api version: count
			markup:		'div', // Available options: Div+p ul/ol+li, blockquote+cite
			trimuser: 	1, //twitter api version: trim_user
			retweets: 	1, //twitter api version: include_rts
			entities: 	1, //twitter api version: include_entities
			replies: 	1, //twitter api version: exclude replies
		};
		// Overwrite default options with user provided ones and merge them into "options".
		var options = $.extend({}, defaults, options);

		$.ajax({
  			url: "",
  			dataType: json,
  			ifModified: true,
  			statusCode: {
	  			404: function() {
	  				//
	  			}
	  		},
  			error: function() {
  				//
  			},
  			success: function(data){
  				//
  			}
		});
	};
})( jQuery );