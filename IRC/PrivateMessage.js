var IRC=require('./util.js').IRC;

function PrivateMessage(message)
{
	var source=message.getPrefix(),
		sourceNick=source.match(/^(.*?)!/)[1],
		match=message.getParams().match(/^(.*?) :(.*?)$/),
		destination=match[1],
		messageText=match[2],
		originalMessage=message;

	function sendReply(message, omitTarget)
	{
		var text='';
		if(isChannelMessage() && !omitTarget)
		{
			text+=sourceNick+': ';
		}
		text+=message;
		originalMessage.getMoka().queueMessage(IRC.privmsg({
			'target': isChannelMessage()?destination:sourceNick,
			'message': text
		}))
	}

	function isQueryMessage()
	{
		return destination.charAt(0) !== '#'
	}
	function isChannelMessage()
	{
		return !isQueryMessage();
	}
	return {
		'reply': function(reply, inPrivate)
		{
			if(reply instanceof Array)
			{
				for(var i in reply)
				{
					sendReply(reply[i], i!=0)
				}
			}
			else
			{
				sendReply(reply, false);
			}
		},
		'toString': function()
		{
			return sourceNick+': '+messageText;
		},
		'getText': function()
		{
			return messageText;
		},
		'getSender': function(longName)
		{
			return longName?source:sourceNick;
		}
	}
}

exports.PrivateMessage=PrivateMessage;