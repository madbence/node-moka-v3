function isValidMessage(message)
{
	return message.match(/^(:(.*?) )?(.*?) (.*?)\r\n$/) !== null;
}

function parse(message)
{
	if(!isValidMessage(message))
	{
		throw new Error('Message \''+(message.length>33?(message.substr(0,30)+'...'):message)+'\' is not valid.');
	}
	
}