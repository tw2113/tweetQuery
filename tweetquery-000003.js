/*!
 * tweetQuery
 * Copyright: WTFPL
 * Version: .000003
 * Requires: jQuery v1.3.2 or later
 * Twitter API docs: https://dev.twitter.com/docs/api/1/get/statuses/user_timeline
 * Twitter Endpoint: https://api.twitter.com/1/statuses/user_timeline.json
 */

/*
JSONP is a haven for XSS issues
consider server side proxy
*/
(function( $ ) {
	$.fn.tweetQuery = function(options) {
		// set up default options
		var defaults = {
			username:		"twitter", //twitter api version: screen_name
			tweetcount:		5, //twitter api version: count
			markup:			'div', // Available options: Div+p ul/ol+li, blockquote+cite
			trimuser:		1, //twitter api version: trim_user
			incretweets:	0, //twitter api version: include_rts
			incentities:	1, //twitter api version: include_entities
			exreplies:		1 //twitter api version: exclude_replies
		};
		// Overwrite default options with user provided ones and merge them into "options".
		var myoptions = $.extend({}, defaults, options);
		var tweets = '';
		tweets += 'https://api.twitter.com/1/statuses/user_timeline.json?';
		tweets += 'screen_name='+myoptions.username+'&';
		tweets += 'count='+myoptions.tweetcount+'&';
		tweets += 'trim_user='+myoptions.trimuser+'&';
		tweets += 'include_rts='+myoptions.incretweets+'&';
		tweets += 'include_entities='+myoptions.incentities+'&';
		tweets += 'exclude_replies='+myoptions.exreplies+'&';
		tweets += 'callback=?';

		$.ajax({
			url: tweets,
			dataType: 'jsonp',
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
				var tweet = '';
				if(myoptions.markup == 'ul') {
					tweet += '<ul>';
				}
				$.each(data, function(i,tweets) {
					if(myoptions.markup == 'ul'){
						tweet += '<li>'+tweets.text+'</li>';
					} else if(myoptions.markup == 'blockquote'){
						tweet += '<blockquote>'+tweets.text+'</blockquote>';
					} else {
						tweet += '<div><p>'+tweets.text+'</p></div>';
					}
				});
				if(myoptions.markup == 'ul') {
					tweet += '</ul>';
				}
				function twitify( text ) {
					// replace urls with linked ones & replace @username with clickable twitter link & hashtags with tweet searches
					var t = text.replace(/(http|https)(:\/\/)([^ )]+)/ig, '<a href="$1$2$3">$1$2$3</a>' );
					t = t.replace(/@([^ ]+)/gi,'<a href="http://twitter.com/$1">@$1</a>');
					t = t.replace(/#([^ ]+)/gi,'<a href="http://search.twitter.com/search?q=%23$1">#$1</a>');
					return t;
				}
				//Not working yet
				$(this).append(tweet);
			}
		});

	};
})( jQuery );