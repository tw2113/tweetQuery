## jQuery tweetQuery

## Basic Options

* username:		"twitter"

The twitter username you want to show. Defaults to "twitter"

* tweetcount: 5

How many tweets you want to display. Defaults to 5

* markup: 'div'

The type of markup you want. Options are "div", "ul", and "ol". Defaults to "div"

* trimuser: 1

Trim user information. Defaults to true.

* include_rts: 1

Include RTs. Setting to false removes any RTs from the total tweetcount shown above. If you have 4 recent tweets and 1 RT, you'll only be shown the 4 non RTs. Defaults to true

* include_entities:	1

Include entities. This is basically tweet metadata. See: https://dev.twitter.com/docs/tweet-entities. Defaults to true
