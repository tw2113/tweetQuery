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
			username: 		"twitter", //twitter api version: screen_name
			tweetcount:		5, //twitter api version: count
			markup:			'div', // Available options: Div+p ul/ol+li, blockquote+cite
			trimuser: 		1, //twitter api version: trim_user
			incretweets: 	0, //twitter api version: include_rts
			incentities: 	1, //twitter api version: include_entities
			exreplies: 		1, //twitter api version: exclude_replies
		};
		// Overwrite default options with user provided ones and merge them into "options".
		var options = $.extend({}, defaults, options);
		var tweets = '';
		tweets += 'https://api.twitter.com/1/statuses/user_timeline.json?';
		tweets += 'screen_name='+options.username+'&';
		tweets += 'count='+options.tweetcount+'&';
		tweets += 'trim_user='+options.trimuser+'&';
		tweets += 'include_rts='+options.incretweets+'&';
		tweets += 'include_entities='+options.incentities+'&';
		tweets += 'exclude_replies='+options.exreplies+'&';
		tweets += 'callback=?';

		$.ajax({
  			url: '',
  			dataType: 'json',
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

  				function twitify( text ) {
  					// replace urls with linked ones & replace @username with clickable twitter link & hashtags with tweet searches
  					var t = text.replace(/(http|https)(:\/\/)([^ )]+)/ig, '<a href="$1$2$3">$1$2$3</a>' );
  					t = t.replace(/@([^ ]+)/gi,'<a href="http://twitter.com/$1">@$1</a>');
  					t = t.replace(/#([^ ]+)/gi,'<a href="http://search.twitter.com/search?q=%23$1">#$1</a>');
  					return t;
  				}
  			}
		});

	};
})( jQuery );