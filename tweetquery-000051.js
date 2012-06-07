/*!
 * tweetQuery
 * Copyright: WTFPL
 * Version: .00005
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
		var self = this;
		// set up default options
		var defaults = {
			username:		"twitter", //twitter api version: screen_name
			tweetcount:		5, //twitter api version: count
			markup:			'div', // Available options: Div+p ul/ol+li
			trimuser:		1, //twitter api version: trim_user
			include_rts:	1, //twitter api version: include_rts
			include_entities:	1 //twitter api version: include_entities
		};
		// Overwrite default options with user provided ones and merge them into "options".
		var myoptions = $.extend({}, defaults, options);
		var tweets = '';
		tweets += 'https://api.twitter.com/1/statuses/user_timeline.json?';
		tweets += 'screen_name='+myoptions.username+'&';
		tweets += 'count='+myoptions.tweetcount+'&';
		tweets += 'trim_user='+myoptions.trimuser+'&';
		tweets += 'include_rts='+myoptions.include_rts+'&';
		tweets += 'include_entities='+myoptions.include_entities+'&';
		tweets += 'callback=?';
		$.ajax({
			url: tweets,
			dataType: 'jsonp',
			ifModified: true,
			statusCode: {
			404: function() {
					$(self).append('I am very sorry, there was an error retrieving tweets');
				}
			},
			success: function(data){
				if(data.length === 0) {
					$(self).append('Something is wrong. Please check your options');
				}
				var tweet = '';
				if(myoptions.markup == 'ul') {
					tweet += '<ul>';
				} else if (myoptions.markup == 'ol') {
					tweet += '<ol>';
				}
				$.each(data, function(i,thetweets) {
					if(myoptions.markup == 'ul' || myoptions.markup == 'ol'){
						tweet += '<li>'+twitify(thetweets.text)+'</li>';
					} else {
						tweet += '<div><p>'+twitify(thetweets.text)+' <a href="https://twitter.com/'+thetweets.user.id+'/status/'+thetweets.id_str+'" title="permalink">link &#x2197;</a></p></div>';
					}
				});
				if(myoptions.markup == 'ul') {
					tweet += '</ul>';
				} else if (myoptions.markup == 'ol') {
					tweet += '</ol>';
				}
				function twitify( text ) {
					// replace urls with linked ones & replace @username with clickable twitter link & hashtags with tweet searches
					var t = text.replace(/(http|https)(:\/\/)([^ )]+)/ig, '<a href="$1$2$3">$1$2$3</a>' );
					t = t.replace(/@([^ ]+)/gi,'<a href="http://twitter.com/$1">@$1</a>');
					t = t.replace(/#([^ ]+)/gi,'<a href="http://search.twitter.com/search?q=%23$1">#$1</a>');
					return t;
				}
				$(self).append(tweet);
			}
		});

	};
})( jQuery );